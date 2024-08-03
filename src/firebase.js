// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB7R7WjY57MqdiNPQ-1qDb5z7M2e9PpgAc",
    authDomain: "lyriclesp.firebaseapp.com",
    projectId: "lyriclesp",
    storageBucket: "lyriclesp.appspot.com",
    messagingSenderId: "417436427539",
    appId: "1:417436427539:web:7a72be0f6ef3f53b7366e6"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Realtime Database y obtener una referencia al servicio
const database = getDatabase(app);
console.log("FIREBASE INICIALIZADO");

export { database };
