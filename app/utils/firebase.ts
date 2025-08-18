import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Extend globalThis type to include our custom property
declare global {
  var _firestoreEmulatorConnected: boolean | undefined;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Define proper error type for Firestore errors
interface FirestoreError extends Error {
  code?: string;
}

// Función helper para manejar errores de Firestore
export const handleFirestoreError = (error: FirestoreError) => {
  console.error("Firestore Error:", error);
  
  if (error.code === 'permission-denied') {
    throw new Error("No tienes permisos para realizar esta acción");
  } else if (error.code === 'unavailable') {
    throw new Error("Servicio no disponible. Inténtalo más tarde");
  } else {
    throw new Error("Error de conexión. Verifica tu conexión a internet");
  }
};