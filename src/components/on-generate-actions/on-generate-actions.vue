<template>
  <div class="p-4">
    <div class="relative inline-block flex">

      <div class="flex items-center  mr-8" v-if="showLike">
      <button @click="toggleHeart" class="flex items-center bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition duration-300 ease-in-out">
        <img src="assets/icon/pumpkin.svg" alt="Pumpkin Icon" class="w-6 h-6 " />
      </button>
      <span class="text-orange-500 font-semibold ml-2">{{ heartCount }}</span>
    </div>

      <!-- Botón de compartir -->
      <button
        @click="togglePopup"
        class="p-2 md:p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 border border-orange-600"
      >
        <p class="text-1xl md:text-1xl font-extrabold text-orange-500 text-center flex items-center space-x-2 hover:text-white">
          
          <span>Compartir</span>
        </p>
      </button>

      <!-- Popup para compartir en redes sociales -->
      <div
        v-if="isPopupVisible"
        class="absolute z-50 bg-gray-900 border border-gray-700 rounded-lg mb-2 p-4 shadow-xl space-y-2 w-48 bottom-full left-1/2 md:left-1/3 transform -translate-x-1/2"
        @click.stop
      >
        <h4 class="text-orange-500 font-bold ">Comparte en:</h4>
        <button
          v-for="network in socialNetworks"
          :key="network.name"
          @click="sharePhoto(network.name)"
          class="flex items-center space-x-2 p-2 bg-gray-800 hover:bg-orange-600 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          <i :class="network.icon" class="text-orange-500 text-xl"></i>
          <span class="text-sm text-orange-500">{{ network.name }}</span>
        </button>
        <button
         
          class="flex items-center space-x-2 p-2 bg-gray-800 hover:bg-orange-600 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          <i  class="fa fa-download text-orange-500 text-xl"></i>
          <span class="text-sm text-orange-500">Descargar</span>
        </button>
      </div>
    </div>
  
    <!-- Copiar URL de imagen -->
    <div class="flex flex-col md:flex-row items-center mt-4 p-2 rounded-lg shadow-md space-x-4 overflow-hidden" v-if="false">
      <!-- Título ocupa todo el ancho en móviles -->
      <span class="text-orange-500 font-semibold text-xl md:text-5xl w-full text-center md:text-left">URL imagen original</span>

      <!-- Texto que muestra la URL -->
      <small class="block text-sm text-gray-400 max-w-sm overflow-x-auto whitespace-nowrap">
        {{ urlOriginal }}
      </small>

      <!-- Botón de copiar -->
      <button
        @click="copyToClipboard"
        class="p-2 mt-2 md:mt-0 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 border border-orange-600 flex items-center"
      >
        <span class="text-sm text-orange-500">Copiar</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isHearted = ref(false);
const heartCount = ref(0);

// Props de entrada
const props = defineProps({
  urlOriginal: String,
  previewUrl: String,
  id: String,
  showLike:Boolean,
});

// Redes sociales para compartir
const socialNetworks = [
  { name: "WhatsApp", icon: "fa-brands fa-whatsapp" },
  { name: "Twitter", icon: "fa-brands fa-twitter" },
  { name: "Facebook", icon: "fa-brands fa-facebook" },
];

// Control del popup
const isPopupVisible = ref(false);

// Alternar la visibilidad del popup
const togglePopup = () => {
  isPopupVisible.value = !isPopupVisible.value;
};

// Compartir en redes sociales
const sharePhoto = (networkName: string) => {
  const imageUrl = props.previewUrl;
  const textToShare = `¡Mira esta imagen que generé! Gracias a Halloween Me: https://halloween-me.vercel.app/photo?id=${props.id}`;

  let shareUrl = "";
  switch (networkName) {
    case "WhatsApp":
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare + " " + imageUrl)}`;
      break;
    case "Twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToShare)}&url=${encodeURIComponent(imageUrl)}`;
      break;
    case "Facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
      break;
  }

  window.open(shareUrl, "_blank");
  isPopupVisible.value = false; // Cerrar el popup después de compartir
};
// Alternar el estado del corazón
const toggleHeart = () => {
  isHearted.value = !isHearted.value;
  heartCount.value += isHearted.value ? 1 : -1; // Incrementar o decrementar el contador
};
// Copiar URL al portapapeles
const copyToClipboard = () => {
  navigator.clipboard.writeText(props.urlOriginal || "").then(() => {
    alert("URL copiada al portapapeles!");
  });
};
</script>

<style scoped>
/* Estilo general para imágenes */
img {
  max-width: 100%;
  height: auto;
}

/* Estilo para los botones de compartir */
button {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
