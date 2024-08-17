import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './firebase'; 
import AnimateOnScroll from 'primevue/animateonscroll';
import './assets/tailwind.css';
import clickOutside from './directivas/click-outside'


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.directive('click-outside', clickOutside);
app.directive('animateonscroll', AnimateOnScroll);
app.use(createPinia())
app.use(router)

app.mount('#app')
