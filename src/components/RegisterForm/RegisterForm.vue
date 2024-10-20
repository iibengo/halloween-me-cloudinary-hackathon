<template>
    <div>
      <h2>Registro</h2>
      <form @submit.prevent="handleRegister">
        <input
          type="email"
          v-model="email"
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrar</button>
      </form>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';


  export default defineComponent({
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleRegister() {
        this.errorMessage = ''; // Resetear el mensaje de error
  
        try {
          const response = await fetch('/api/linkWithCredentials', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Error en el registro: " + errorData.message);
          }
  
          // Redirigir al usuario a la página de inicio o login
         // window.location.href = "/login"; // Cambia esto a la página que desees después de registrar
        } catch (error) {
          this.errorMessage = "Error al registrar el usuario. " + error.message;
          console.error("Error durante el registro:", error);
        }
      },
    },
  });
  </script>
  
  <style scoped>
  /* Agrega estilos aquí si lo deseas */
  </style>
  