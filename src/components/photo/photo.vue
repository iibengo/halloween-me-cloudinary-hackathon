<template>
  <Loading v-if="!dataLoaded" />
  <div
    class="min-h-screen bg-orange-900 flex items-center justify-center p-4 m-b-8"
  >
    <div class="w-full md:max-w-3xl bg-black rounded-lg shadow-2xl p-b-12">
      <div class="p-6 space-y-6">
        <h1
          class="text-4xl md:text-5xl md:text-4xl lg:text-3xl font-extrabold text-orange-500 text-center"
        >
          Generador de imagenes Halloween
        </h1>
        <!-- Botones de temas -->
        <div
          class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-4"
        >
          <button
            @click="onHalloweenMeClick"
            class="py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          >
            HALLOWEEN ME
          </button>
        </div>

        <!-- Contenedor de imágenes -->
        <div
          class="relative inline-block overflow-hidden rounded-lg border-4 border-orange-500"
        >
          <img
            v-if="!isGenerated"
            id="preview"
            :src="previewUrl"
            :style="{ opacity: previewOpacity }"
            class="object-cover w-full h-full"
          />
          <two-up v-else>
            <img
              id="original"
              :src="urlOriginal"
              class="object-cover w-full h-full"
            />
            <img
              id="preview"
              :src="previewUrl"
              :style="{ opacity: previewOpacity }"
              class="object-cover w-full h-full"
            />
          </two-up>
        </div>

        <div v-if="isGenerated">
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
        <div class="flex mt-0 p-0">
          <span class="text-orange-500">Imagen original: </span>
          <small
            class="ml-4 block text-sm text-gray-400 mt-1 max-w-sm overflow-x-auto whitespace-nowrap"
          >
            {{ urlOriginal }}
          </small>
        </div>
        <button
          @click="onNewClick"
          class="text-sm py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
        >
          IR AL INICIO
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import "two-up-element";
import Loading from "../ui/loading.vue";
import axios from "axios";
import { funnyPhrases } from "../../data";
import { navigate } from "astro:transitions/client";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase-service";
const loading = ref(true);
// Obtener el ID de la URL
const { searchParams } = new URL(window.location.href);
const id = searchParams.get("id");

if (id == null) window.location.href = "/"; // Redirigir si no hay ID
const urlOriginal = ref("");
const dataLoaded = ref(false);

const isGenerated = ref(false);
const previewUrl = ref("");
const previewOpacity = ref(1);
const error = ref("");

onMounted(async () => {
  urlOriginal.value = getCldImageUrl({ src: id || "" });
  previewUrl.value = urlOriginal.value;

  const img = new Image();
  img.src = previewUrl.value;

  img.onload = async () => {
    try {
      const response = await axios.post("/api/saveGeneratedImg", {
        imgId: id,
        original: true,
        cludinaryUrl: urlOriginal.value,
      });
      console.log(response.data); // Respuesta del servidor
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
    dataLoaded.value = true;
    await generateImg();
  };
});

const createOverlay = (text: string, yOffset: number, fontSize: number) => {
  return {
    text: {
      text, // Texto a mostrar
      fontFamily: "Impact", // Tipo de fuente
      fontSize, // Tamaño de la fuente
      color: "#FFFFFF", // Color del texto,
      lineSpacing: 100,
      letterSpacing: 3,
    },
    position: {
      gravity: "south", // Posición (parte inferior)
      x: 0, // Desplazamiento horizontal
      y: yOffset, // Desplazamiento vertical
    },
  };
};
const randomColors: string[] = ["white", "orange", "red", "black"];
const getRandomString = (strings: string[]): string => {
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
};
const getRandomPhrase = (strings: string[][]): string[] => {
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
};

const topicList = [
  "Add scary ghosts to the background",
  "Add zombies to the background",
  "Add jungle to the background",
];

const selectedConfigParams = {
  topic: getRandomString(topicList),
  overlay: (width: number, height: number) => {
    // Seleccionar una frase aleatoria que ya está dividida en dos partes
    const textHeightPercentage = 0.25; // 25% de la altura para cada texto
    const availableHeightForText = height * textHeightPercentage;

    const fontSize = Math.min(width * 0.08, availableHeightForText); // Elige el menor entre 8% del ancho o el alto permitido

    const [upperText, lowerText] = getRandomPhrase(funnyPhrases);
    const upperYOffset = Math.round(height * 0.85); // Ajusta la posición del texto superior (75% de la altura)
    const lowerYOffset = Math.round(height * 0.1); // Ajusta la posición del texto inferior (15% de la altura)

    // Crear el overlay para la frase superior
    const upperOverlay = createOverlay(upperText, upperYOffset, fontSize); // Ajusta yOffset y fontSize según sea necesario

    // Crear el overlay para la frase inferior
    const lowerOverlay = createOverlay(lowerText, lowerYOffset, fontSize); // Ajusta yOffset y fontSize según sea necesario

    // Retornar ambos overlays en un array
    return [upperOverlay, lowerOverlay];
  },
};
async function getImageDimensions(publicId: string) {
  try {
    const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
    // Llamar a la API de Cloudinary para obtener detalles del recurso
    const response = await axios.get(
      `https://res.cloudinary.com/${cloudName}/image/upload/fl_getinfo/${publicId}`
    );
    const { width, height } = response.data.input;
    return { width, height };
  } catch (error) {
    console.error("Error al obtener las dimensiones de la imagen:", error);
  }
} // Manejar clics en los botones
const onHalloweenMeClick = async () => {
  await generateImg();
};
const onNewClick = async () => {
  navigate(`/`);
};
const generateImg = async (retryCount = 0) => {
  isGenerated.value = false;
  const { width, height } = await getImageDimensions(id || "");
  dataLoaded.value = false;

  const newUrl = getCldImageUrl({
    src: id || "",
    replaceBackground: topicList[0],
    overlays: selectedConfigParams.overlay(width, height),
  });

  previewOpacity.value = 0.3; // Disminuir opacidad durante la carga
  previewUrl.value = newUrl;

  const img = new Image();
  img.src = newUrl;

  img.onload = () => {
    dataLoaded.value = true;
    previewOpacity.value = 1; // Restaurar opacidad
  };

  img.onerror = (error) => {
    console.log(error);
    // Aquí puedes verificar el código de error específico
    if (error) {
      // Si el error es el que queremos manejar, reintentar
      console.error("Error en la carga de la imagen, reintentando...");
      if (retryCount < 3) {
        // Limitar a 3 reintentos
        generateImg(retryCount + 1); // Reintentar
      } else {
        console.error(
          "Error de carga de imagen después de múltiples intentos."
        );
      }
    } else {
      console.error("Error al cargar la imagen:", error);
    }
  };
  isGenerated.value = true;
};

// Función para descargar la imagen
const handleDownload = () => {
  const downloadUrl = getCldImageUrl({ src: id, format: "avif" });

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "image.avif";
  a.click();
};
// Redes sociales
const socialNetworks = [{ name: "Whatsapp", icon: "fa-brands fa-whatsapp" }];
const sharePhoto = (networkName: string) => {
  const imageUrl = previewUrl.value; // URL de la imagen generada
  const textToShare =
    "¡Mira esta imagen que generé! Gracias a " +
    "https://halloween-me.vercel.app/photo?id=" +
    id +
    ""; // Texto a compartir

  // WhatsApp permite enviar mensajes que incluyen imágenes públicas
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare + " " + imageUrl)}`;
  window.open(shareUrl, "_blank"); // Abre la URL en una nueva pestaña
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
