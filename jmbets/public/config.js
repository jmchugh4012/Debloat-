// Paste the web app config from Firebase console → Project settings → Your apps.
// These values are safe to publish; your security rules are what protect the data.
export const firebaseConfig = {
  apiKey: "AIzaSyAnPM-r7kcbldm8SzyvPwLS8nIrlaZ-Uz0",
  authDomain: "jmbets-86d68.firebaseapp.com",
  projectId: "jmbets-86d68",
  storageBucket: "jmbets-86d68.firebasestorage.app",
  messagingSenderId: "120346733318",
  appId: "1:120346733318:web:2b8f356bf377ba82aa8c87",
};

// Turn on after deploying the readBetSlip function with your Anthropic API key (README step 6).
export const screenshotImport = false;

// Local testing only: talk to the Firebase emulators instead of the live project.
export const useEmulators = location.hostname === "localhost" || location.hostname === "127.0.0.1";
