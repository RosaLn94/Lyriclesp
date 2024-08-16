<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { startDailyUpdate } from "./services/updateService";
import { onMounted } from 'vue';

// Llama a startDailyUpdate cuando el componente se monte
onMounted(() => {
  startDailyUpdate();
});
</script>

<template>

  <header>
    <h1><img src="@/assets/logo.svg" class="logo" />yricle<img src="@/assets/dragonite.gif" width="125" height="125" class="gif" /></h1>
    
  </header>
  <div class="container">
    <div class="hero">
      <h1>Que haces aquí puta</h1>
<!--       <p>Find the lyrics that speak to you and your mood.</p>
      <a href="#" class="btn">Get Started</a> -->
    </div>
  </div>
  <footer>
    <p>&copy; 2024 Lyriclesp. All rights reserved. Atpc ea</p>
  </footer>

  <RouterView />
</template>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #231f1f;
  color: #333;
}

header {
  background-color: #250648;
  color: white;
  padding: 20px;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 100px 20px;
  background-color: #231f1f;
}

.hero h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.btn {
  background-color: #1e90ff;
  color: white;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
}

.btn:hover {
  background-color: #0d75d6;
}

.logo{
  width: 5%;
}
.gif{
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
