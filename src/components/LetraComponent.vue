<template>

  <div class="container mx-auto p-6">
    <div class="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <ul class="divide-y divide-gray-700">
        <transition-group name="fade" tag="div">
          <li
            v-for="(item, index) in letraMostrar"
            :key="index"
            class="fixed-item text-white hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 animate-fade-in"
          >
            <span v-if="index<=skipped" class="text-content animate-fade-in text-lg">{{ item }}</span>
          </li>
        </transition-group>
      </ul>
    </div>
    <div class="text-center mt-4">
      <button
        @click="skip"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Skip
      </button>
    </div>
  </div>
  <div v-if="fail">
    JUEGO ACABADO
  </div>

</template>
<script setup>
import Button from 'primevue/button';
import axios from 'axios';
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
const letraMostrar = letraArray.slice(0,7);
const skipped = ref(0);
const fail = ref(false);
console.log(localStorage);


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

function skip(){
  if(skipped.value >= 6){
    fail.value = true;
  }else{
    skipped.value++;
  }
}
</script>
<style scoped>
.fixed-item {
  height: 4rem; /* Altura fija para cada elemento */
  display: flex;
  align-items: center; /* Centra verticalmente el contenido */
  justify-content: center; /* Centra horizontalmente el contenido */
  padding: 0 1rem; /* Relleno horizontal para que el texto no toque los bordes */
  overflow: hidden; /* Evita que el contenido se desborde */
  box-sizing: border-box; /* Incluye padding y border en el tamaño total */
  text-align: center; /* Alinea el texto horizontalmente en el centro */
}

.text-content {
  display: inline-block; /* Hace que el span respete el ancho del contenedor */
}

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
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>