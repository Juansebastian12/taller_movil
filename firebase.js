// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBV7fo274EDPx7vhUqltKu9lPbJOEDbA8A",
  authDomain: "my-app-c1f88.firebaseapp.com",
  projectId: "my-app-c1f88",
  storageBucket: "my-app-c1f88.firebasestorage.app",
  messagingSenderId: "995975642923",
  appId: "1:995975642923:web:3f7744716bfe427ab50f6e",
  measurementId: "G-5CHQNHZQ6E"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa Auth con persistencia en AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Analytics solo si está soportado
export let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});


