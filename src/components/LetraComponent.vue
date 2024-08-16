<template>
    {{ artistaElegido }}
    {{ cancionElegida }}

    {{ letra }}
</template>
<script setup>
import axios from 'axios';
//import { onMounted } from 'vue';
import './../firebase'; 

const databaseURL = "https://lyriclesp-default-rtdb.europe-west1.firebasedatabase.app/";
const responseArtista = await axios.get(`${databaseURL}Letras/artistaDelDia.json`);
const artistaElegido = responseArtista.data;
const responseCancion = await axios.get(`${databaseURL}Letras/cancionDelDia.json`);
const cancionElegida = responseCancion.data;
const canciones = await axios.get(`${databaseURL}Letras.json?orderBy="nombre"&equalTo="${artistaElegido}"`);
const cancionesData = canciones.data;
const letra = obtenerLetraPorTitulo(cancionElegida);
console.log(letra)

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
<style scoped></style>