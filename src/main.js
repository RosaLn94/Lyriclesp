import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB7R7WjY57MqdiNPQ-1qDb5z7M2e9PpgAc",
    authDomain: "lyriclesp.firebaseapp.com",
    projectId: "lyriclesp",
    storageBucket: "lyriclesp.appspot.com",
    messagingSenderId: "417436427539",
    appId: "1:417436427539:web:7a72be0f6ef3f53b7366e6"
  };

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(createPinia())
app.use(router)

app.mount('#app')
