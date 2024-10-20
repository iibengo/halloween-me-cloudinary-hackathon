<template>
  <div>
    <h2>Bienvenido, {{ email }}</h2>
    <button @click="handleLogout">Cerrar Sesión</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      email: 'user@example.com', // Aquí deberías manejar el correo electrónico del usuario de manera adecuada
    };
  },
  methods: {
    async handleLogout() {
  try {
    const response = await fetch('/api/loguot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

    if (!response.ok) {
      const errorData = await response.json();

    console.error("Error durante el cierre de sesión:", errorData);
      throw new Error("Error al cerrar sesión: " + errorData.message);
    }

    // Redirigir al usuario a la página de login
    window.location.href = "/login"; // Cambia esto según sea necesario
  } catch (error) {
    console.error("Error durante el cierre de sesión:", error);
 // Muestra el mensaje de error al usuario
  }
}
  },
});
</script>

<style scoped>
/* Agrega estilos aquí si lo deseas */
</style>
