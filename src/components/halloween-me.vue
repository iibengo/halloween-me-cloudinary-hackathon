<template>
    <div class="min-h-screen bg-orange-900 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-black rounded-lg shadow-2xl overflow-hidden">
        <div class="p-6 space-y-6">
          <h1 class="text-3xl font-extrabold text-orange-500 text-center">Halloween Photo App</h1>
          
          <button 
            @click="applyHalloweenFilter"
            class="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          >
            HALLOWEEN ME
          </button>
  
          <div class="relative aspect-square overflow-hidden rounded-lg border-4 border-orange-500">
            <img 
              :src="imageUrl" 
              alt="Halloween Photo" 
              class="w-full h-full object-cover"
              :class="{ 'filter-halloween': isHalloweenified }"
            />
            <div v-if="isHalloweenified" class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
          </div>
  
          <div class="flex justify-center space-x-4">
            <button 
              v-for="network in socialNetworks" 
              :key="network.name"
              @click="sharePhoto(network.name)"
              class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            >
              <component :is="network.icon" class="w-6 h-6 text-orange-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Facebook, Twitter, Instagram } from 'lucide-vue-next';
  
  const imageUrl = ref('/placeholder.svg?height=400&width=400');
  const isHalloweenified = ref(false);
  
  const socialNetworks = [
    { name: 'Facebook', icon: Facebook },
    { name: 'Twitter', icon: Twitter },
    { name: 'Instagram', icon: Instagram },
  ];
  
  const applyHalloweenFilter = () => {
    // Aquí iría la lógica para aplicar el filtro de Halloween
    // Por ahora, solo cambiaremos el estado
    isHalloweenified.value = true;
  };
  
  const sharePhoto = (network) => {
    // Aquí iría la lógica para compartir en redes sociales
    console.log(`Compartiendo en ${network}`);
  };
  </script>
  
  <style scoped>
  .filter-halloween {
    filter: sepia(50%) hue-rotate(20deg) saturate(150%);
  }
  </style>