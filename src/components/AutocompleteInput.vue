<template>
    <div class="relative shadow-xl" v-click-outside="closeSuggestions">
        <input type="text" v-model="query" @input="filterSuggestions" class="p-2 shadow-xl border rounded w-full dark-mode"
            placeholder="Buscar..." />
        <ul v-if="filteredSuggestions.length"
            class="absolute z-10 w-full bg-black border border-t-0 rounded-b shadow-lg max-h-60 overflow-y-auto">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @click="selectSuggestion(suggestion)"
                class="p-2 cursor-pointer hover:bg-blue-500 hover:text-white text-white">
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import artistasJson from '@/assets/artists.json';

export default {
    setup() {
        const query = ref('');

        const suggestions = ref([]);

        const procesarJSON = () => {
            suggestions.value = artistasJson.artistas.flatMap(artista =>
                artista.canciones.map(cancion => `${artista.nombre} - ${cancion}`)
            );
        };
        const filteredSuggestions = ref([]);

        const filterSuggestions = () => {
            const searchTerm = query.value.toLowerCase();
            filteredSuggestions.value = suggestions.value.filter((item) =>
                item.toLowerCase().includes(searchTerm)
            );
        };

        const selectSuggestion = (suggestion) => {
            query.value = suggestion;
            filteredSuggestions.value = [];
        };

        const closeSuggestions = () => {
            filteredSuggestions.value = [];
        };
        onMounted(() => {
            procesarJSON();
        });
        return {
            query,
            filteredSuggestions,
            filterSuggestions,
            selectSuggestion,
            closeSuggestions,
        };
        
    },
};
</script>

<style scoped>
input.dark-mode {
    background-color: #2d2d2d; /* Color de fondo oscuro */
    color: #ffffff; /* Color del texto blanco */
    border: 1px solid #444; /* Opcional: color del borde */
}

input.dark-mode::placeholder {
    color: #888; /* Color del texto del placeholder */
}
/* Estilo adicional si es necesario */
</style>