import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC9qc2vfYWjGVWKbuduisXklf4GhdztxtU",
    authDomain: "brainser-69030.firebaseapp.com",
    projectId: "brainser-69030",
    storageBucket: "brainser-69030.appspot.com",
    messagingSenderId: "528403819663",
    appId: "1:528403819663:web:8e2b8e8e8e8e8e8e8e8e8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Set persistence to session or local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current session or local storage.
    // Closing the window would NOT clear any existing state even if a user forgets to sign out.
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });

export { auth, provider };