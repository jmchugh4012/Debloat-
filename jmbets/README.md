# JMbets — standalone site

Your bet-tracking site on your own domain. Anyone can view your bets without an account.
Followers sign in with Google (or an emailed link) to follow you and tail bets.
Only you can post, edit, grade or delete bets.

It runs on **Firebase** (Google): free hosting with your own domain, a live database, and sign-in.
The only required cost is the domain (about $10–20 a year).

## What's in this folder

| Path | What it is |
|---|---|
| `public/index.html` | The site |
| `public/backend.js` | Connects the site to Firebase (sign-in, database, screenshot import) |
| `public/config.js` | **You edit this:** your Firebase project's settings |
| `public/seed-bets.json` | Your 8 bets from the old claude.ai page, for a one-click move |
| `firestore.rules` | Security rules: who can read and write what |
| `functions/` | Optional server code for screenshot import (calls Claude) |
| `firebase.json`, `.firebaserc` | Firebase deploy settings |

## Setup (about 30 minutes)

### 1. Buy your domain
Buy a domain such as `jmbets.com` from Cloudflare, Porkbun, Namecheap or Squarespace. Check that it's available first.

### 2. Create a Firebase project
1. Go to <https://console.firebase.google.com> and click **Create a project**. Name it something like `jmbets`. You can turn off Google Analytics.
2. On the project home page, click the **web** icon (`</>`) to add a web app. Name it `JMbets`. Don't tick Firebase Hosting here.
3. Firebase shows a `firebaseConfig = { ... }` block. Copy those values into `public/config.js`.
4. Put your project ID (shown in **Project settings**) into `.firebaserc` in place of `your-firebase-project-id`.

### 3. Turn on sign-in
In the console, open **Build → Authentication → Get started → Sign-in method**:
- **Google:** enable it, pick your support email, and save.
- **Email/Password:** enable it, also turn on **Email link (passwordless sign-in)**, and save.
  This matters because Instagram, TikTok and similar apps block Google sign-in inside their built-in browsers, so followers coming from your bio sign in with an emailed link instead.

### 4. Create the database
Open **Build → Firestore Database → Create database**. Choose **production mode** and a location near you (for example `nam5 (United States)`).

### 5. Deploy the site
You'll need [Node.js](https://nodejs.org) (LTS version) on your computer. In a terminal, from this `jmbets` folder:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting,firestore
```

The deploy prints a link like `https://your-project-id.web.app`. Your site is live there.

### 6. Make yourself the owner
1. Open your site and click **Sign in to follow**. Sign in with the account you'll post from.
2. In the console, go to **Authentication → Users** and copy your **User UID**.
3. Go to **Firestore Database → Start collection**. Name the collection `admins`. Set the **Document ID** to your UID, add a field `role` = `owner`, and save.
4. Reload your site. You'll see **Post a bet** and **Edit bio**, plus a **Bring over 8 bets** button that copies your bets from the old page. Click it once.

Only accounts in `admins` can post. Nobody can add themselves there from the site; the security rules block it.

### 7. Connect your domain
1. In the console, go to **Build → Hosting → Add custom domain** and enter your domain.
2. Firebase shows DNS records (usually an `A` record and a `TXT` record). Add them in your domain registrar's DNS settings.
3. Wait for Firebase to show **Connected**. The security certificate can take up to 24 hours.
4. Go to **Authentication → Settings → Authorized domains** and add your domain (and `www.` if you use it), or sign-in won't work there.

Then put `https://yourdomain.com` in your bio.

### 8. Optional: screenshot import
Screenshot import reads a sportsbook screenshot with Claude and fills in the post form. It runs as a server function so your API key stays private.
1. In Firebase, upgrade to the **Blaze (pay as you go)** plan. Functions need it. Set a budget alert (for example $5) under **Usage and billing**. Normal use stays in the free tier.
2. Create an API key at <https://console.anthropic.com> and add a few dollars of credit. Each import costs roughly 1–3 cents.
3. From this folder:
   ```bash
   firebase functions:secrets:set ANTHROPIC_API_KEY
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```
4. In `public/config.js`, set `screenshotImport = true`, then run `firebase deploy --only hosting`.

The function only runs for accounts in `admins`, so followers can't run up your bill.

## Updating the site later
Edit the files and run `firebase deploy --only hosting` (add `,firestore` if you change `firestore.rules`).

## Notes
- **Followers from the old page** need to follow again here, since their sign-ins were Claude accounts.
- **The old claude.ai page** keeps working, but bets you post there won't show up here. Post on the new site from now on.
- **NFL rosters** in the player picker reflect roughly the 2025 season. "Type a name…" covers anyone missing.
- After moving your old bets you can delete `public/seed-bets.json` and redeploy. It only contains bets that are already public on your site.

## Testing locally (optional)
With the Firebase CLI installed, run `firebase emulators:start --only auth,firestore --project demo-jmbets`, then serve `public/` at `http://localhost:5000` (for example `npx serve public -l 5000`). On `localhost` the site talks to the emulators instead of your live project.
