<template>

  <div class="container mx-auto p-6">
    <div class="shadow-lg rounded-lg overflow-hidden bgcolor shadow-xl">
      <ul class="divide-y divide-black-700 shadow-xl">
        <transition-group name="fade" tag="div">
          <li v-for="(item, index) in letraMostrar" :key="index"
            class="fixed-item text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 animate-fade-in">
            <span v-if="index <= skipped" class="text-content animate-fade-in text-lg">{{ item }}</span>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="linea-colorear">
      <div
        v-for="(color, index) in aciertosColor"
        :key="index"
        :style="{ backgroundColor: color, opacity: index < skipped ? 1 : 0.2 }"
        class="segmento"
      ></div>
    </div>
    <div class="relative mt-4">
      <div class="w-full">
        <AutocompleteInput ref="autocompleteRef" class="w-full"></AutocompleteInput>
      </div>
      <div class="flex justify-end space-x-4 mt-2">
        <button @click="skip"
          class="w-[150px] bg-transparent text-purple-800 py-2 px-4 rounded-lg hover:bg-purple-500 hover:text-white border border-purple-800 transition duration-300 shadow-xl">
          <span v-if="skipped < 6">Y yo que sé xd</span>
          <span v-else>Me rindo 😭</span>
        </button>

        <button @click="resolver"
          class="w-[150px] bg-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-500 transition duration-300 shadow-xl">
          <span v-if="skipped < 6">RESUELVO</span>
          <span v-else>Me la juego🤭</span>
        </button>
      </div>


    </div>


  </div>


  <div v-if="fail">
    <DialogFinalComponent :visibleDialog="true" :mensaje="'Bueno... la próxima vez será'" :artista="artistaElegido"
      :cancion="cancionElegida">
    </DialogFinalComponent>
  </div>
  <div v-if="winwin">
    <DialogFinalComponent :visibleDialog="true" :mensaje="'OLEEEEEEEEEEEEE'" :artista="artistaElegido"
      :cancion="cancionElegida">
    </DialogFinalComponent>
  </div>

</template>
<script setup>
import axios from 'axios';
import './../firebase';
import { ref } from 'vue'
import AutocompleteInput from './AutocompleteInput.vue';
import DialogFinalComponent from './DialogFinalComponent.vue';

const databaseURL = "https://lyriclesp-default-rtdb.europe-west1.firebasedatabase.app/";
const responseArtista = await axios.get(`${databaseURL}Letras/artistaDelDia.json`);
const artistaElegido = responseArtista.data;
const responseCancion = await axios.get(`${databaseURL}Letras/cancionDelDia.json`);
const cancionElegida = responseCancion.data;
const canciones = await axios.get(`${databaseURL}Letras.json?orderBy="nombre"&equalTo="${artistaElegido}"`);
const cancionesData = canciones.data;
const letra = obtenerLetraPorTitulo(cancionElegida);
const letraArray = letra.split('\n');
const letraMostrar = letraArray.slice(0, 7);
const skipped = ref(0);
const fail = ref(false);
const autocompleteRef = ref(null);
const winwin = ref(false);
const aciertosColor = ref(['#838fa3', '#838fa3', '#838fa3', '#838fa3', '#838fa3', '#838fa3', '#838fa3']);
 


function obtenerLetraPorTitulo(titulo) {
  for (const clave in cancionesData) {
    const cancion = cancionesData[clave].canciones.find(c => c.titulo === titulo);
    if (cancion) {
      return cancion.letra;
    }
  }
  return 'Canción no encontrada';
}

function skip() {
  if (skipped.value >= 6) {
    fail.value = true;
  } else {
    skipped.value++;
  }
  autocompleteRef.value = ""
}

function resolver() {
  const arrayRespuesta = autocompleteRef.value.query.split(" - ");
  if (arrayRespuesta[0].toLowerCase() === artistaElegido.toLowerCase() && arrayRespuesta[1].toLowerCase() === cancionElegida.toLowerCase()) {
    winwin.value = true;
    aciertosColor.value[skipped.value] = '#0ec417';
  } else if(arrayRespuesta[0].toLowerCase() === artistaElegido.toLowerCase() && arrayRespuesta[1].toLowerCase() != cancionElegida.toLowerCase()){
    aciertosColor.value[skipped.value] = '#ddf542';
    skip();
  } else{
    aciertosColor.value[skipped.value] = '#851d1d';
    skip();
  }

}
</script>
<style scoped>
.linea-colorear {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
}

.segmento {
  width: 12%;
  height: 5px;
  border-radius: 5px;
  transition: opacity 0.3s ease, background-color 0.3s ease;
}
.fixed-item {
  height: 4rem;
  /* Altura fija para cada elemento */
  display: flex;
  align-items: center;
  /* Centra verticalmente el contenido */
  justify-content: center;
  /* Centra horizontalmente el contenido */
  padding: 0 1rem;
  /* Relleno horizontal para que el texto no toque los bordes */
  overflow: hidden;
  /* Evita que el contenido se desborde */
  box-sizing: border-box;
  /* Incluye padding y border en el tamaño total */
  text-align: center;
  /* Alinea el texto horizontalmente en el centro */
}

.colorear{
  width: 30px;
  height: 2px;
  border: solid 5px black;
  border-radius: 5px;
}

.text-content {
  display: inline-block;
  /* Hace que el span respete el ancho del contenedor */
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.bgcolor {
  background-color: #21132c;
}
</style>