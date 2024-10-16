<template>
    <div>
        <h1 class="text-3xl font-extrabold text-orange-500 text-left">
          Generador de imágenes Halloween
        </h1>
      <!-- Lista de imágenes generadas -->
      <ul class="grid grid-cols-2 gap-4 mt-6">
        <li v-for="image in images" :key="image.id">
          <a :href="`/photo?id=${image.imgId}`">
            <CldImage
              :src="image.imgId"
              width="250"
              height="250"
              :crop="{
                type: 'fill',
                source: true,
              }"
              class="rounded-lg border-4 border-orange-500"
            />
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { CldUploadWidget, CldImage } from "astro-cloudinary";
  import { getPublicHalloweenMeListServiceWrapper } from '@/service-wrappers';
  
  // Lista de imágenes
  const images = ref([]);
  
  // Configuración del widget
  const widgetOptions = {
    sources: ["local"],
    multiple: false,
    maxFiles: 1,
    language: "es",
    text: {
      es: {
        or: "O",
        menu: {
          files: "Subir desde tu dispositivo",
        },
        local: {
          browse: "Seleccionar",
          dd_title_single: "Arrastra tu imagen aquí",
        },
      },
    },
  };
  
  // Función para obtener las imágenes desde el servidor (simulando el await getCollection de Astro)
  const fetchImages = async () => {
    const data = await getPublicHalloweenMeListServiceWrapper.get();
   images.value = data; // Asigna los datos recibidos a la referencia de imágenes
  };
  
  // Manejo de la subida exitosa
  const onUploadSuccess = (result) => {
    fetchImages(); // Vuelve a cargar las imágenes después de una carga exitosa
  };
  
  // Llamada a la función para cargar las imágenes al montar el componente
  onMounted(() => {
   
    fetchImages();
  });
  </script>
  
  <style scoped>
  main {
    text-align: center;
  }
  
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    list-style: none;
  }
  </style>
  