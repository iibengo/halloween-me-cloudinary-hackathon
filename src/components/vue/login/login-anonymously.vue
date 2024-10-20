<template>
    <div class="text-white">
      <h2>Inicio de Sesión Anónimo</h2>
      <button @click="handleLoginAnonymous">Iniciar Sesión Anónimamente</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        errorMessage: '',
      };
    },
    methods: {
      async handleLoginAnonymous() {
        this.errorMessage = ''; // Resetear el mensaje de error
  
        try {
          const response = await fetch('/api/loginAnonymous', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Error en el inicio de sesión anónimo: " + errorData.message);
          }
  
          const data = await response.json();
          console.log("Inicio de sesión anónimo exitoso:", data);
          
          // Redirigir al usuario a la página inicial
          window.location.href = "/yourPage"; // Cambia esto a la página que desees después de iniciar sesión
        } catch (error) {
          this.errorMessage = "Error al iniciar sesión anónimamente. " + error.message;
          console.error("Error durante el inicio de sesión:", error);
        }
      },
    },
  });
  </script>
  
  <style scoped>
  /* Agrega estilos aquí si lo deseas */
  </style>