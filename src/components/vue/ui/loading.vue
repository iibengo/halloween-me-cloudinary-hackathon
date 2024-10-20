<template>
  <div class="fixed inset-0 flex items-center justify-center bg-orange-900 bg-opacity-90 z-50">
    <div class="text-center">
      <div class="mb-8 relative w-24 h-24 mx-auto animate-bounce">
        <!-- Cuerpo de la calabaza -->
        <div class="absolute inset-0 bg-orange-500 rounded-full"></div>
        <!-- Ojos -->
        <div class="absolute top-1/4 left-1/4 w-4 h-4 bg-black rounded-full"></div>
        <div class="absolute top-1/4 right-1/4 w-4 h-4 bg-black rounded-full"></div>
        <!-- Boca -->
        <div class="absolute bottom-1/4 left-1/4 right-1/4 h-3 bg-black rounded-full"></div>
        <!-- Tallo -->
        <div class="absolute -top-3 left-1/2 w-4 h-6 bg-green-800 rounded-t-full transform -translate-x-1/2"></div>
      </div>
      <p class="text-2xl font-bold text-orange-200">
        {{ loadingText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {loadingTexts} from '@/data'



const loadingText = ref(loadingTexts[0]);
let intervalId;

onMounted(() => {
  let index = 0;
  intervalId = setInterval(() => {
    index = (index + 1) % loadingTexts.length;
    loadingText.value = loadingTexts[index];
  }, 2000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Puedes ajustar el tamaño del loader aquí si es necesario */
.z-50 {
  z-index: 50; /* Asegura que esté al frente */
}

.animate-bounce {
  animation: bounce 1s infinite; /* Animación de rebote */
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Altura del rebote */
  }
}
</style>
