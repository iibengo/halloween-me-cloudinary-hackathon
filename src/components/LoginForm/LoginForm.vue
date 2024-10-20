<template>
  <div>
    <h2>Inicio de Sesión</h2>
    <form @submit.prevent="handleLogin">
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
      <button type="submit">Iniciar Sesión</button>
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
    async handleLogin() {
      this.errorMessage = ''; // Resetear el mensaje de error

      try {
        const response = await fetch('/api/login', {
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
          throw new Error("Error en el inicio de sesión: " + errorData.message);
        }

        // Redirigir al usuario a la página inicial
        window.location.href = "/yourPage"; // Cambia esto a la página que desees después de iniciar sesión
      } catch (error) {
        this.errorMessage = "Error al iniciar sesión. " + error.message;
        console.error("Error durante el inicio de sesión:", error);
      }
    },
  },
});
</script>

<style scoped>
/* Agrega estilos aquí si lo deseas */
</style>
