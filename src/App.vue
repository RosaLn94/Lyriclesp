<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { startDailyUpdate } from "./services/updateService";
import { onMounted } from 'vue';
import CabeceraComponent from './components/CabeceraComponent.vue';

// Llama a startDailyUpdate cuando el componente se monte
onMounted(() => {
  startDailyUpdate();
});
</script>

<template>
  <div class="app">

    <header>
      <CabeceraComponent />

    </header>
    <div class="container">
      <div class="hero">
        <RouterView />
        <!--       <p>Find the lyrics that speak to you and your mood.</p>
      <a href="#" class="btn">Get Started</a> -->
      </div>
    </div>

    <footer>
      <p>&copy; 2024 Lyriclesp. All rights reserved. Atpc ea</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  background: linear-gradient( #181818, #241349,#181818);
  height: 100vh;
}



/* header {
  background-color: #250648;
  color: white;
  padding: 20px;
  text-align: center;
} */

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.logo {
  width: 4%;
}

.gif {
  margin-right: 0;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
