import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

// Create user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
};

// Sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { user: result.user };
  } catch (error) {
    return { error: error.message };
  }
};

// Sign out
export const doSignOut = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

// Send password reset email
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

// Update password
export const doPasswordChange = async (password) => {
  if (!auth.currentUser) return { error: "No user is currently signed in." };
  try {
    await updatePassword(auth.currentUser, password);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

// Send email verification
export const doSendEmailVerification = async () => {
  if (!auth.currentUser) return { error: "No user is currently signed in." };
  try {
    await sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};
