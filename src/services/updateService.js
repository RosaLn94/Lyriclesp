import axios from "axios";
import artistasJson from '@/assets/artists.json';

const databaseURL = "https://lyriclesp-default-rtdb.europe-west1.firebasedatabase.app/";

const updateValueDaily = async () => {
  try {
    const pathFecha = 'Letras/fechaUltAct.json'

    const response = await axios.get(`${databaseURL}${pathFecha}`);
    let valorFechaUltAct = response.data;
    const fechaActual = getFecha();
    console.log(valorFechaUltAct);
    console.log("FECHAS:", valorFechaUltAct + " - " + fechaActual);
    if(fechaActual != valorFechaUltAct){
        const artistas = artistasJson.artistas;
        const randomArtista = getRandomNumber(0, artistas.length - 1);
        const artistaElegido = artistas[randomArtista];
        const randomCancion = getRandomNumber(0, artistaElegido.canciones.length - 1);
        const cancionElegida = artistaElegido.canciones[randomCancion];
    
        //Actualizamos los valores diariamente
        await axios.patch(`${databaseURL}Letras.json`, { "artistaDelDia" : artistaElegido.nombre });
        await axios.patch(`${databaseURL}Letras.json`, { "cancionDelDia" : cancionElegida });
        await axios.patch(`${databaseURL}Letras.json`, { "fechaUltAct" : fechaActual });
    }



  } catch (error) {
    console.error("Error al actualizar el valor:", error);
  }
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFecha(){
    const fechaActual = new Date();

    // Formatear día, mes y año
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const anio = fechaActual.getFullYear();

    // Crear la cadena con el formato deseado
    return `${dia}/${mes}/${anio}`;
}

export const startDailyUpdate = () => {
  // (86400000 ms = 24 horas)
  //const interval = 86400000;

  // Actualizar inmediatamente al cargar, y luego cada 24 horas
  updateValueDaily();
  //setInterval(updateValueDaily, interval);
};