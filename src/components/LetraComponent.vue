<template>
    {{ artistaElegido.nombre }}
    {{ cancionElegida }}

    {{ letra }}
</template>
<script setup>
import artistasJson from '@/assets/artists.json';
import axios from 'axios';
import { onMounted } from 'vue';

const artistas = artistasJson.artistas;
const randomArtista = getRandomNumber(0, artistas.length - 1);
const artistaElegido = artistas[randomArtista];
const randomCancion = getRandomNumber(0, artistaElegido.canciones.length - 1);
const cancionElegida = artistaElegido.canciones[randomCancion];

const fetchData = async () => {
    try {
        const response = await axios.get(`https://api.lyrics.ovh/v1/${artistaElegido.nombre}/${cancionElegida}`);
        const letra = response.data;
        console.log("LETRA", letra);
        return letra;
    } catch (error) {
        console.error('Error fetching letra', error);
    }
}

//const segundaOpcion = async ()


onMounted(() => {
  const letra = fetchData();
  console.log(letra);
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>
<style scoped></style>