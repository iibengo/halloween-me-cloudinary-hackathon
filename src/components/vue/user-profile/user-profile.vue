<template>
  <div>
    <div v-if="isAnonRef" class="bg-gray-800 p-4 rounded-lg mb-4">
      <h2 class="text-lg font-bold text-orange-500">Registrate para proteger tu cuenta</h2>
      <p class="text-gray-300 mb-2">
        Estás en modo anónimo. Para proteger tu cuenta, considera registrarte. 
      </p>
      <p class="text-gray-300 mb-2">
       SI ya quienes una cuenta puedes iniciar sesión en <a href="/login" class="text-orange-500"> este link</a> 
      </p>
      <form @submit.prevent="login">
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
          Registrarse
        </button>
      </form>
    </div>

    <div>
      <h3 class="text-xl font-bold text-orange-500">Tus Imágenes</h3>
      <ul class="grid grid-cols-2 gap-4 mt-6">
        <li v-for="(image, index) in imagesWithPlaceholders" :key="image.id">
          <div class="relative w-full h-32 bg-gray-900 animate-pulse" v-if="!image.loaded">
            <!-- Placeholder de imagen -->
          </div>
          <a v-else :href="`/hm?id=${image.id}`">
            <img
              :src="image.cloudinaryUrl"
              style="border-radius: 0.5rem; border: 2.4px solid rgb(249 115 22)"
              class="w-full h-auto object-cover transition-opacity duration-300"
              :class="{ 'opacity-0': !image.loaded, 'opacity-100': image.loaded }"
              loading="lazy"
              @load="image.loaded = true"
              alt="Generated Halloween Image"
            />
          </a>
        </li>
      </ul>
      <p v-if="loading" class="text-center text-gray-500">Loading images...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  userId: {
    type: String,
    required: false,
  },
  isAnon: {
    type: Boolean,
    required: false,
  },
});

const email = ref('');
const password = ref('');
const images = ref([]);
const loading = ref(true);
const isAnonRef = ref(props.isAnon);
// Creamos un array de imágenes con un flag de "loaded"
const imagesWithPlaceholders = ref(
  Array.from({ length: 4 }, () => ({ id: Math.random(), loaded: false })) // Placeholder inicial con 4 elementos
);

// Función para obtener las imágenes de la API
const fetchImages = async () => {
  try {
    const response = await fetch("/api/getUserGeneration", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.userId,
      }),
    });

    const data = await response.json();

    if (data.success) {
      images.value = data.data.map((image: any) => ({
        ...image,
        loaded: true, // Añadimos la propiedad `loaded`
      })).filter(item => item.userId === props.userId || item.isPublic);

      // Actualiza las imágenes reales en el array con placeholders
      imagesWithPlaceholders.value = images.value;
    } else {
      console.error("Error fetching images:", data.error);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  } finally {
    loading.value = false;
  }
};

const login = async () => {
  
  await fetch("/api/linkWithCredentials", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:email.value,
        password:password.value
      }),
    });
    isAnonRef.value=false
};

// Ejecuta la llamada a la API cuando el componente se monta
onMounted(() => {
  fetchImages();
});
</script>

<style scoped>
/* Puedes agregar estilos adicionales para los placeholders si es necesario */
</style>
