// Paste the web app config from Firebase console → Project settings → Your apps.
// These values are safe to publish; your security rules are what protect the data.
export const firebaseConfig = {
  apiKey: "PASTE-YOURS",
  authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT-ID.firebasestorage.app",
  messagingSenderId: "PASTE-YOURS",
  appId: "PASTE-YOURS",
};

// Turn on after deploying the readBetSlip function with your Anthropic API key (README step 6).
export const screenshotImport = false;

// Local testing only: talk to the Firebase emulators instead of the live project.
export const useEmulators = location.hostname === "localhost" || location.hostname === "127.0.0.1";
