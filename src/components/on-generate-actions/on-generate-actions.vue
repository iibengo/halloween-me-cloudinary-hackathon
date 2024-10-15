<template>
  <div>
    <div>
      <!-- Botón de descarga -->
      <div v-if="false">
        <button
          class="bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-orange-600"
          @click="handleDownload"
        >
          Descargar
        </button>
      </div>

      <!-- Botones para compartir en redes sociales -->
      <div class="flex space-x-4 text-left pl-1">
        <h3
          class="text-2xl md:text-2xl md:text-4xl font-extrabold text-orange-500 text-center"
        >
          Compatir:
        </h3>
        <button
          v-for="network in socialNetworks"
          :key="network.name"
          @click="sharePhoto(network.name)"
          class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
        >
          <i
            :class="network.icon"
            class="w-6 h-6 text-orange-500 text-2xl md:text-2xl md:text-4xl"
          ></i>
          <!-- Icono de scroll -->
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// Definir props
const props = defineProps({
  urlOriginal: String,
  previewUrl: String,
  id: String,
});

const handleDownload = () => {
  const downloadUrl = getCldImageUrl({ src: id, format: "avif" });
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "image.avif";
  a.click();
};

const socialNetworks = [{ name: "Whatsapp", icon: "fa-brands fa-whatsapp" }];
const sharePhoto = (networkName: string) => {
    console.log("afafadf")
  const imageUrl = props.previewUrl; 
  const textToShare =
    "¡Mira esta imagen que generé! Gracias a Halloween Me: " +
    "https://halloween-me.vercel.app/photo?id=" +
    props.id;

  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare + " " + imageUrl)}`;
  window.open(shareUrl, "_blank");
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
