<template>
  <div>
    <ul class="grid grid-cols-2 gap-4 mt-6">
      <li v-for="(image, index) in imagesWithPlaceholders" :key="image.id">
        <div class="relative w-full h-32 bg-gray-900 animate-pulse" v-if="!image.loaded">
          <!-- Placeholder de imagen -->
        </div>
        <a v-else :href="getHref(image.id)">
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
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  isEnglish: {
    type: Boolean,
    required: true,
  },
});

const images = ref([]);
const loading = ref(true);

// Creamos un array de imágenes con un flag de "loaded"
const imagesWithPlaceholders = ref(
  Array.from({ length: 4 }, () => ({ id: Math.random(), loaded: false })) // Placeholder inicial con 4 elementos
);

// Función para obtener las imágenes de la API
const fetchImages = async () => {
  try {
    const response = await fetch("/api/getPublicHalloweenMeListService");
    const data = await response.json();

    if (data.success) {
      images.value = data.data.map((image: any) => ({
        ...image,
        loaded: true, // Añadimos la propiedad `loaded`
      }));

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

// Ejecuta la llamada a la API cuando el componente se monta
onMounted(() => {
  fetchImages();
});

// Obtener el href con el idioma correspondiente
const getHref = (id: string) => {
  return props.isEnglish ? `/hm?id=${id}` : `/es/hm?id=${id}`;
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales para los placeholders si es necesario */
</style>
