// Server side of JMbets: reads a sportsbook screenshot (or pasted bet text)
// with Claude so the owner doesn't have to type bets in by hand.
// Only accounts listed in the Firestore `admins` collection can call it.
import Anthropic from "@anthropic-ai/sdk";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onCall, HttpsError } from "firebase-functions/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";

initializeApp();
const ANTHROPIC_API_KEY = defineSecret("ANTHROPIC_API_KEY");

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_PROMPT_CHARS = 60_000;
const MAX_IMAGE_BASE64 = 7_000_000; // about 5 MB of image; the page shrinks screenshots before sending

export const readBetSlip = onCall(
  { secrets: [ANTHROPIC_API_KEY], timeoutSeconds: 300, memory: "512MiB", maxInstances: 3 },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) throw new HttpsError("unauthenticated", "Sign in first.");
    const admin = await getFirestore().doc(`admins/${uid}`).get();
    if (!admin.exists) throw new HttpsError("permission-denied", "Only the site owner can import bets.");

    const { prompt, image } = request.data ?? {};
    if (typeof prompt !== "string" || !prompt.trim() || prompt.length > MAX_PROMPT_CHARS) {
      throw new HttpsError("invalid-argument", "Missing or oversized prompt.");
    }
    const content = [];
    if (image != null) {
      if (!IMAGE_TYPES.has(image?.mediaType) || typeof image?.data !== "string" || image.data.length > MAX_IMAGE_BASE64) {
        throw new HttpsError("invalid-argument", "Use a PNG, JPG, WebP or GIF screenshot under 5 MB.");
      }
      content.push({ type: "image", source: { type: "base64", media_type: image.mediaType, data: image.data } });
    }
    content.push({ type: "text", text: prompt });

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY.value() });
    let response;
    try {
      response = await client.beta.messages.create({
        model: "claude-opus-5-5",
        max_tokens: 16000,
        output_config: { effort: "medium" },
        // If the main model declines, the API retries on a fallback model in the same call.
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        messages: [{ role: "user", content }],
      });
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) throw new HttpsError("resource-exhausted", "Too many imports right now. Try again in a minute.");
      if (err instanceof Anthropic.AuthenticationError) {
        logger.error("Anthropic API key was rejected", err.message);
        throw new HttpsError("failed-precondition", "The Anthropic API key on the server isn't valid.");
      }
      if (err instanceof Anthropic.BadRequestError) {
        logger.error("Anthropic rejected the request", err.message);
        throw new HttpsError("invalid-argument", "That screenshot couldn't be read. Try a different image.");
      }
      if (err instanceof Anthropic.APIError) {
        logger.error(`Anthropic API error ${err.status}`, err.message);
        throw new HttpsError("unavailable", "Claude is unavailable right now. Try again shortly.");
      }
      logger.error("Unexpected error calling Claude", err);
      throw new HttpsError("internal", "Import failed. Try again.");
    }

    if (response.stop_reason === "refusal") {
      throw new HttpsError("failed-precondition", "Claude declined to read that image.");
    }
    const text = response.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    return { text, truncated: response.stop_reason === "max_tokens" };
  },
);
