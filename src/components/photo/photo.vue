<template>
    <main
      :data-id="id"
      class="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-200 text-center py-8"
    >
      <header>
        <h1 class="text-8xl md:text-4xl font-extrabold text-orange-500 mb-6">
          Selecciona el tema
        </h1>
  
        <!-- Botones de temas -->
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-4">
          <button
            v-for="(topic, key) in topics"
            :key="key"
            class="add text-6xl md:text-2xl  bg-gray-800 text-orange-500 py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-orange-600 hover:text-white"
            @click="handleClick(key)"
            :data-topic="key"
          >
            {{ topic.label }}
          </button>
        </div>
      </header>
  
      <!-- Imágenes -->
      <two-up>
        <img id="original" :src="url" />
        <img id="preview" :src="previewUrl" />
      </two-up>
      <small class="block text-sm text-gray-400 my-2">{{ url }}</small>
  
      <!-- Botón de descarga -->
      <div class="mt-4">
        <button
          class="download bg-orange-500 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300 hover:bg-orange-600"
          @click="handleDownload"
        >
          Descargar en Avif
        </button>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getCldImageUrl } from "astro-cloudinary/helpers";
  import "two-up-element";
  
  // Obtener el ID de la URL
  const { searchParams } = new URL(window.location.href);
  const id = searchParams.get("id");
  
  if (id == null) window.location.href = "/"; // Redirigir si no hay ID
  
  const url = getCldImageUrl({ src: id });
  const previewUrl = ref(url);
  const previewOpacity = ref(1);
  
  // Temas para los botones
  const topics = {
    ghost: { label: "Add scary ghosts to the background" },
    zombies: { label: "Add zombies to the background" },
    devil: { label: "Add a dark alley to the background" },
  };

  // Manejar clics en los botones
  const handleClick = (topic) => {
    const newUrl = getCldImageUrl({
      src: id,
      replaceBackground: topics[topic].label,
    });
    previewOpacity.value = 0.3; // Disminuir opacidad durante la carga
    previewUrl.value = newUrl;
  
    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      previewOpacity.value = 1; // Restaurar opacidad
    };
  };
  
  // Función para descargar la imagen
  const handleDownload = () => {
    const downloadUrl = getCldImageUrl({ src: id, format: "avif" });
  
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "image.avif";
    a.click();
  };
  </script>
  
  <style scoped>
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  