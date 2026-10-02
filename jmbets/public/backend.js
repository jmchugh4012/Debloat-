// Connects the JMbets page to Firebase (sign-in, database, screenshot import).
// It exposes the same small interface the page used when it lived on claude.ai,
// so the page code stays the same: claude.use("db" | "user" | "sample").
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth, connectAuthEmulator, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
  signOut, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  getFirestore, connectFirestoreEmulator, collection, doc, query, orderBy, limit, onSnapshot,
  getDoc, getDocs, setDoc, updateDoc, deleteDoc, addDoc,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { getFunctions, connectFunctionsEmulator, httpsCallable } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-functions.js";
import { firebaseConfig, screenshotImport, useEmulators } from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app);
const functions = getFunctions(app);
if (useEmulators) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(fs, "127.0.0.1", 8080);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

const EMAIL_KEY = "jmbets.signin.email";
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  del: (k) => { try { localStorage.removeItem(k); } catch {} },
};

// ---- sign-in ---------------------------------------------------------------
let emailLinkPending = false;
async function finishEmailLink(email) {
  await signInWithEmailLink(auth, email, location.href);
  store.del(EMAIL_KEY);
  history.replaceState(null, "", location.pathname);
}
if (isSignInWithEmailLink(auth, location.href)) {
  const saved = store.get(EMAIL_KEY);
  if (saved) { try { await finishEmailLink(saved); } catch { emailLinkPending = true; } }
  else emailLinkPending = true; // opened on another device or browser: the page asks for the email
}
const currentUser = await new Promise((resolve) => { const off = onAuthStateChanged(auth, (u) => { off(); resolve(u); }); });

// Apps like Instagram, TikTok and Facebook open links in their own browser, where Google blocks sign-in.
const inAppBrowser = /Instagram|FBAN|FBAV|FB_IAB|TikTok|musical_ly|Snapchat|Twitter|Line\/|LinkedInApp/i.test(navigator.userAgent);

const authApi = {
  signedIn: !!currentUser,
  inAppBrowser,
  emailLinkPending,
  async google() {
    const provider = new GoogleAuthProvider();
    try { await signInWithPopup(auth, provider); }
    catch (e) {
      if (e?.code === "auth/popup-blocked") return signInWithRedirect(auth, provider);
      throw e;
    }
  },
  async emailLink(email) {
    await sendSignInLinkToEmail(auth, email, { url: location.origin + location.pathname, handleCodeInApp: true });
    store.set(EMAIL_KEY, email);
  },
  finishEmailLink,
  signOut: () => signOut(auth),
  onChange(fn) { let first = true; return onAuthStateChanged(auth, (u) => { if (first) { first = false; return; } fn(u); }); },
};

// Keep a public name and photo for followers so their faces show on bets they tail.
if (currentUser) {
  const name = (currentUser.displayName || (currentUser.email || "").split("@")[0] || "").slice(0, 80);
  setDoc(doc(fs, "users", currentUser.uid), { name, photo: (currentUser.photoURL || "").slice(0, 1000) }).catch(() => {});
}

// ---- database (same shape the page already uses) --------------------------
const mapErr = (e) => ({
  code: e?.code === "permission-denied" ? "invalid_argument" : e?.code === "resource-exhausted" ? "resource_exhausted" : "unavailable",
  message: e?.message || "Database error",
});
const rethrow = (e) => { throw mapErr(e); };
const wrapDocSnap = (s) => ({ id: s.id, exists: s.exists(), data: () => s.data(), metadata: s.metadata });
const wrapQuerySnap = (qs) => ({ docs: qs.docs.map(wrapDocSnap), size: qs.size, empty: qs.empty, metadata: qs.metadata });
function wrapQuery(q) {
  return {
    orderBy: (field, dir) => wrapQuery(query(q, orderBy(field, dir || "asc"))),
    limit: (n) => wrapQuery(query(q, limit(n))),
    get: () => getDocs(q).then(wrapQuerySnap, rethrow),
    onSnapshot: (next, error) => onSnapshot(q, (s) => next(wrapQuerySnap(s)), (e) => error?.(mapErr(e))),
  };
}
function wrapDoc(ref) {
  return {
    id: ref.id, path: ref.path,
    get: () => getDoc(ref).then(wrapDocSnap, rethrow),
    set: (data) => setDoc(ref, data).catch(rethrow),
    update: (data) => updateDoc(ref, data).catch(rethrow),
    delete: () => deleteDoc(ref).catch(rethrow),
    onSnapshot: (next, error) => onSnapshot(ref, (s) => next(wrapDocSnap(s)), (e) => error?.(mapErr(e))),
    collection: (p) => wrapCollection(`${ref.path}/${p}`),
  };
}
function wrapCollection(path) {
  const c = collection(fs, path);
  return {
    ...wrapQuery(c), path,
    doc: (id) => wrapDoc(id ? doc(c, id) : doc(c)),
    add: (data) => addDoc(c, data).then(wrapDoc, rethrow),
  };
}
const db = { doc: (p) => wrapDoc(doc(fs, p)), collection: (p) => wrapCollection(p) };

// ---- who is viewing --------------------------------------------------------
const uid = currentUser?.uid ?? null;
const isAdmin = uid ? await getDoc(doc(fs, "admins", uid)).then((s) => s.exists(), () => false) : false;

const initials = (name, color) => {
  const t = (name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="${color}"/><text x="32" y="41" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#0a0f1f" text-anchor="middle">${t.replace(/[<&>"]/g, "")}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
};
const COLORS = ["#ff6a2b", "#ffc53d", "#3ddc84", "#7aa2ff", "#ff7ab6", "#5ee1e6"];
const colorFor = (id) => COLORS[[...String(id)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % COLORS.length];
const profileCache = new Map();
async function profile(id) {
  if (!profileCache.has(id)) {
    profileCache.set(id, getDoc(doc(fs, "users", id)).then((s) => (s.exists() ? s.data() : {}), () => ({})));
  }
  const p = await profileCache.get(id);
  const color = colorFor(id);
  return { id, name: p.name || "", avatarUrl: p.photo || initials(p.name, color), color, email: null, isMe: id === uid, guest: false };
}
const user = {
  isOwner: async () => isAdmin,
  canEdit: async () => isAdmin,
  can: async (what) => (what === "data.write" ? !!uid : false),
  id: async () => uid,
  me: async () => ({ ...(uid ? await profile(uid) : { id: null, name: "", avatarUrl: initials("", "#9ca8c8"), color: "#9ca8c8", email: null }), isOwner: isAdmin, canEdit: isAdmin }),
  profiles: async (ids) => {
    const list = [...new Set([].concat(ids))];
    const out = {};
    await Promise.all(list.map(async (id) => { out[id] = await profile(id); }));
    return out;
  },
};

// ---- screenshot import (owner only, runs on the server) --------------------
async function shrinkImage(blob) {
  // Send at most ~1600px on the long side as JPEG; plenty for reading a bet slip.
  const bmp = await createImageBitmap(blob);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale); canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const out = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.9));
  const dataUrl = await new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(out); });
  return { mediaType: "image/jpeg", data: String(dataUrl).split(",")[1] };
}
function parseJsonLoose(text) {
  const t = String(text || "").trim();
  try { return JSON.parse(t); } catch {}
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) { try { return JSON.parse(fence[1]); } catch {} }
  const start = t.search(/[[{]/), end = Math.max(t.lastIndexOf("]"), t.lastIndexOf("}"));
  if (start >= 0 && end > start) { try { return JSON.parse(t.slice(start, end + 1)); } catch {} }
  throw { code: "invalid_json", message: "Couldn't read the reply", text: t };
}
const readBetSlip = httpsCallable(functions, "readBetSlip", { timeout: 300_000 });
const sample = screenshotImport && isAdmin ? {
  limits: async () => ({ maxPromptBytes: 262144, images: { maxCount: 1, maxInputBytes: 20_000_000, mediaTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"] } }),
  async json(input, opts = {}) {
    if (opts.signal?.aborted) throw { code: "cancelled", message: "Stopped" };
    const payload = { prompt: String(input) };
    const img = opts.images instanceof Blob ? opts.images : opts.images?.[0];
    if (img) {
      try { payload.image = await shrinkImage(img); }
      catch { throw { code: "image_rejected", message: "Couldn't open that image" }; }
    }
    const call = readBetSlip(payload).then((r) => r.data, (e) => {
      const c = String(e?.code || "").replace("functions/", "");
      throw {
        code: c === "resource-exhausted" ? "rate_limited" : c === "unauthenticated" || c === "permission-denied" ? "not_granted"
          : c === "invalid-argument" ? "image_rejected" : "upstream_error",
        message: e?.message || "Import failed",
      };
    });
    const stopped = new Promise((_, rej) => opts.signal?.addEventListener("abort", () => rej({ code: "cancelled", message: "Stopped" }), { once: true }));
    const res = await Promise.race([call, stopped]);
    return parseJsonLoose(res.text);
  },
} : null;

const api = { use: async (name) => ({ db, user, sample }[name] ?? null), auth: authApi };
window.claude = api;
window.__jmbResolve?.(api);
