# MyToDoList Web App

This is a simple collaborative To‑Do List web application built with **Firebase** and **Google Sign‑In**.

## Project structure
```
MyToDoList/
├─ index.html   # UI markup, loads Firebase SDKs and `app.js`
└─ app.js       # Firebase initialization, auth, Firestore CRUD
```

## Prerequisites
- An existing Firebase project. The project you mentioned is **my‑to‑do‑list‑91d1c**.
- Node.js (optional, for using the Firebase CLI).
- A web server to serve the files (e.g., `python -m http.server` or any static hosting).

## Setup steps
1. **Configure Firebase**
   - Open the Firebase console → *Project Settings* → *General* → *Your apps* → select the web app (or add a new one).
   - Copy the **Firebase SDK config** (the `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId`).
   - Replace the placeholder object in `app.js` (lines 1‑11) with the real values:
     ```js
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "my-to-do-list-91d1c.firebaseapp.com",
       projectId: "my-to-do-list-91d1c",
       storageBucket: "my-to-do-list-91d1c.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
     };
     ```
2. **Enable Google Sign‑In**
   - In the Firebase console, go to *Authentication* → *Sign‑in method* → enable **Google**.
3. **Create Firestore database**
   - Navigate to *Firestore Database* → *Create database* (choose production mode and a region).
   - No additional security rules are needed for this demo; the default rules allow read/write for authenticated users.
4. **Run the app locally**
   - Open a terminal in the `MyToDoList` folder.
   - Serve the files, e.g.:
     ```
     python -m http.server 8080
     ```
   - Open `http://localhost:8080` in a browser. Click **Sign in with Google**, add todos, toggle completion, or delete them. Changes sync in real time across any signed‑in user.
5. **Deploy (optional)**
   - You can deploy to Firebase Hosting:
     ```
     npm install -g firebase-tools   # if not installed
     firebase login                    # sign in
     firebase init hosting            # choose the `MyToDoList` folder as public
     firebase deploy
     ```
   - After deployment, your app will be available at `https://<project-id>.web.app`.

## How it works
- **Google Sign‑In**: `auth.signInWithPopup` authenticates the user and provides a `uid`.
- **Firestore collection `todos`** stores each todo document with fields:
  - `text` (string)
  - `completed` (bool)
  - `createdAt` (timestamp)
  - `owner` (uid, optional for per‑user filtering)
- A real‑time listener (`onSnapshot`) updates the UI for all connected users instantly, enabling collaborative editing.

Feel free to customise the UI or add features such as per‑user filtering, task priorities, or sharing links.

---
*If you need further assistance (e.g., adding custom security rules or extending functionality), just let me know!*