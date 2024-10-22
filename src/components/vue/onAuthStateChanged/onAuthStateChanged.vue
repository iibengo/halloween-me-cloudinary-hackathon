<template>
    <div>
   
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  
  // Estado reactivo, especificando el tipo de user
  const loading = ref(true);
  const user = ref<any | null>(null); // user puede ser un objeto User o null
  
  onMounted(() => {
    const auth = getAuth(); // Obtener la instancia de autenticación
     
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // El usuario está autenticado
        user.value = currentUser;
      } else {
        // No hay usuario autenticado
        user.value = null;
      }
      loading.value = false; // Actualizar el estado de carga
    });
  });
  </script>
  
  <style scoped>
  /* Agrega tus estilos aquí */
  </style>
  