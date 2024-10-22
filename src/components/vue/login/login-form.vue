<template>
  <div class="min-h-screen bg-orange-900 flex items-center justify-center p-4 mb-8">
    <div class="w-full md:max-w-3xl rounded-lg shadow-2xl bg-black p-8">
      <TopMenu :isEnglish="isEnglish" />
      <div class="p-6 space-y-6">
        <h1 class="text-2xl md:text-4xl lg:text-3xl font-extrabold text-orange-500 text-center">
          Generador de imágenes Halloween
        </h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-gray-300">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-300">Contraseña:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200"
            />
          </div>
          <button
            type="submit"
            class="w-full p-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition duration-300"
          >
            Iniciar sesión
          </button>
        </form>
        <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({

  isEnglish: {  // Prop para determinar el idioma
    type: Boolean,
    default: false,
  },
});

const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Función para manejar el registro
const handleLogin = async () => {
  errorMessage.value = ''; // Resetear el mensaje de error

  try {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("Error en el inicio de sesión: " + errorData.message);
    }

    const data = await response.json();
   window.location.href = '/profile';
  } catch (error) {
  }
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si lo deseas */
</style>
