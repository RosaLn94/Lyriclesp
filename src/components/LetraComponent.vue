<template>
<!--   <div v-for="(item,index) in letraArray" :key="index">
    <div v-if="index<=skipped" v-animateonscroll="{ enterClass: 'animate-flipleft', leaveClass: 'animate-fadeout' }" class="flex bg-primary text-primary-contrast shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-2xl animate-duration-1000 animate-ease-in-out">
      <span class="text-3xl font-bold">{{ item }}</span>
    </div>
  </div> -->
<!--   <div class="container mx-auto p-4">
    <ul class="bg-black shadow-md rounded-lg divide-y divide-gray-200">
      <li v-for="(item, index) in letraArray" :key="index" class="p-4 hover:bg-gray-100">
        <span v-if="index<=skipped">{{ item }}</span>
      </li>
    </ul>
  </div> -->
  <div class="container mx-auto p-6">
    <div class="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <ul class="divide-y divide-gray-700 max-h-[24rem] overflow-y-auto">
        <li
          v-for="(item, index) in letraArray"
          :key="index"
          class="p-4 text-white hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 animate-fade-in"
        >
        <span v-if="index<=skipped" class="p-4 text-white hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 animate-fade-in">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
  <Button label="Primary" @click="skipped++">Skip </Button>
<!--     {{ artistaElegido }}
    {{ cancionElegida }}

    {{ letraArray }} -->
</template>
<script setup>
import Button from 'primevue/button';
import axios from 'axios';
//import { onMounted } from 'vue';
import './../firebase'; 
import { ref } from 'vue'

const databaseURL = "https://lyriclesp-default-rtdb.europe-west1.firebasedatabase.app/";
const responseArtista = await axios.get(`${databaseURL}Letras/artistaDelDia.json`);
const artistaElegido = responseArtista.data;
const responseCancion = await axios.get(`${databaseURL}Letras/cancionDelDia.json`);
const cancionElegida = responseCancion.data;
const canciones = await axios.get(`${databaseURL}Letras.json?orderBy="nombre"&equalTo="${artistaElegido}"`);
const cancionesData = canciones.data;
const letra = obtenerLetraPorTitulo(cancionElegida);
const letraArray = letra.split('\n');
const skipped = ref(0);
console.log(localStorage);

/* const fetchData = async () => {
    try {
        //const response = await axios.get(`https://api.lyrics.ovh/v1/${artistaElegido.nombre}/${cancionElegida}`);
        const response = await axios.get(`https://lyriclesp-default-rtdb.europe-west1.firebasedatabase.app/Letras.json?orderBy="nombre"&equalTo="${artistaElegido.nombre}"`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }});
        const letra = response.data;
        console.log("LETRA", letra);
        return letra;
    } catch (error) {
        console.error('Error fetching letra', error);
    }
} */

//const segundaOpcion = async ()


/* onMounted(() => {
}); */

function obtenerLetraPorTitulo(titulo) {
    // Iterar sobre las claves del objeto principal
    for (const clave in cancionesData) {
        const cancion = cancionesData[clave].canciones.find(c => c.titulo === titulo);
        if (cancion) {
            return cancion.letra;
        }
    }
    return 'Canción no encontrada';
}
</script>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}</style>