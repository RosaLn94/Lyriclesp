<template>
  <header class="bg-purple-950 text-white flex items-center justify-between p-4 shadow-lg">
    <!-- Menú Desplegable -->
    <div class="relative flex-grow flex justify-center">
      <button @click="toggleMenu" ref="menuButton" class="flex items-center focus:outline-none">
        <!-- Ícono de Menú -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <!-- Contenido del Menú Mejorado -->
      <transition name="fade">
        <div
          v-if="menuOpen"
          class="absolute left-1/2 transform -translate-x-1/2 mt-9 w-48 bg-purple-800 rounded-lg shadow-lg text-white z-10"
        >
          <ul class="py-2">
            <li class="px-4 py-2 hover:bg-purple-700 cursor-pointer">Futuras opciones</li>
          </ul>
        </div>
      </transition>
    </div>

    <!-- Contenedor Central -->
    <div class="flex items-center justify-center">
      <!-- Logo -->
      <img src="@/assets/logo.svg" alt="Logo" class="h-10 mr-3" />
      <!-- Título -->
      <h1 class="text-2xl font-bold">yriclesp</h1>
    </div>

    <!-- GIF -->
    <div class="relative flex-grow flex justify-center">
      <img
        src="@/assets/dragonite.gif"
        alt="Gif animado"
        class="h-10"
      />
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    handleClickOutside(event) {
      if (this.menuOpen && !this.$refs.menuButton.contains(event.target)) {
        this.menuOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Estilo para la transición del menú desplegable */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active en Vue <2.1.8 */ {
  opacity: 0;
}
</style>
