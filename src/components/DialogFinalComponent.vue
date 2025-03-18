<template>
  <Dialog
    v-model:visible="visible"
    :draggable="true"
    :modal="true"
    :closable="true"
    :style="{ width: '90vw', maxWidth: '900px', backgroundColor: 'rgba(0, 0, 0, 0.8)' }"
    :contentStyle="{ padding: '0' }"
  >
    <div class="p-5 text-white text-center">
      <!-- Título dinámico -->
      <h2 class="text-2xl font-bold mb-4">{{ props.mensaje }}</h2>
      <p class="m-4"> {{ artista }} - {{ cancion }}</p>

      <!-- Video de YouTube en iframe -->
      <iframe
        width="100%"
        height="450"
        :src="videoUrl"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </Dialog>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import Dialog from "primevue/dialog";

const props = defineProps({
  visibleDialog: {type: Boolean, default: false},
  mensaje: null,
  artista: null,
  cancion: null
});
const apiKey= import.meta.env.VITE_APP_YOUTUBE_API_KEY;
const visible = ref(props.visibleDialog);
const videoUrl = ref('');
const searchVideo = async () => {
/*   try {
    const response = await axios.get('https://www.youtube.com/results', {
      params: {
        search_query: props.artista +" "+props.cancion,
      },
    });

    // Usar una expresión regular para encontrar el primer videoId en el HTML
    const videoIdMatch = response.data.match(/"videoId":"(.*?)"/);
    
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1];
      videoUrl.value = `https://www.youtube.com/embed/${videoId}`;
    } else {
      alert('No video found');
    }
  } catch (error) {
    console.error('Error searching for video:', error);
  } */
  const url = `https://www.googleapis.com/youtube/v3/search`;
  const search= props.artista +" "+props.cancion;

try {
  const response = await axios.get(url, {
    params: {
      part: 'snippet',
      q: search, // Búsqueda basada en el término
      type: 'video',
      key: apiKey,
      maxResults: 1 // Número de videos que quieres recuperar
    }
  });
  var videoId = "";

  // Recuperar el ID del primer video en los resultados
  if (response.data.items.length > 0) {
    videoId = response.data.items[0].id.videoId;
    videoUrl.value = `https://www.youtube.com/embed/${videoId}`;
  } else {
    alert('No se encontraron videos');
  }
} catch (error) {
  console.error('Error en la solicitud a YouTube API:', error);
}
};

onMounted(() => {
  searchVideo();
});
</script>
<style scoped>
/* Estilos para el diálogo */
::deep .dialog-container .p-6 {
  background: transparent;
  border: none;
}

::deep .dialog-container {
  /* Ajuste para el fondo del diálogo */
  background: transparent;
  border: none;
  /* Tamaño del diálogo */
  width: 90vw; /* 90% del ancho de la ventana */
  max-width: 100vw; /* Máximo ancho fijo */
  height: 90vh; /* 90% de la altura de la ventana */
  max-height: 90vh; /* Evita que el diálogo sea más alto que la ventana */
  margin: auto; /* Centra el diálogo */
}

::deep .dialog-container .p-6 {
  background: transparent;
}

::deep .dialog-container .relative {
  background: transparent;
}

/* Estilos adicionales para el iframe */
::deep .relative {
  position: relative;
}

::deep .relative iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>