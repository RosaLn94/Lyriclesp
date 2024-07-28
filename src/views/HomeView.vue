<script setup>
import LetraComponent from '@/components/LetraComponent.vue';
</script>

<template>
  <main>
    <Suspense>
      <LetraComponent></LetraComponent>
      <template #fallback>
        Cargando...
      </template>
    </Suspense>
   
  </main>
</template>
