<template>
  <div class="min-h-screen bg-orange-900 flex items-center justify-center p-4 ">
    <div class="w-full md:max-w-4xl bg-black rounded-lg shadow-2xl  ">
      <div class="p-6 space-y-6">
        <h1 class="text-4xl md:text-5xl md:text-4xl lg:text-3xl font-extrabold text-orange-500 text-center">
    Cloudinary Hackathon 
</h1>
        <!-- Botones de temas -->
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-4">
    <button
        @click="handleClick(key)"
        class="py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
    >
        HALLOWEEN ME
    </button>
</div>


        <!-- Contenedor de imágenes -->
   <!-- Contenedor de imágenes -->
<div class="relative inline-block overflow-hidden rounded-lg border-4 border-orange-500">
    <two-up>
        <img id="original" :src="url" class="object-cover w-full h-full" />
        <img
            id="preview"
            :src="previewUrl"
            :style="{ opacity: previewOpacity }"
            class="object-cover w-full h-full"
        />
    </two-up>
</div>

        <small class="block text-sm text-gray-400 my-2">{{ url }}</small>

        <!-- Botón de descarga -->
        <div class="mt-4">
          <button
            class="bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-orange-600"
            @click="handleDownload"
          >
            Descargar en Avif
          </button>
        </div>

        <!-- Botones para compartir en redes sociales -->
        <div class="flex justify-center space-x-4 mt-6">
          <button
            v-for="network in socialNetworks"
            :key="network.name"
            @click="sharePhoto(network.name)"
            class="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          >
            <component :is="network.icon" class="w-6 h-6 text-orange-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import "two-up-element";
import "../../styles/global.css";
import { Facebook, Twitter, Instagram } from "lucide-vue-next";


// Obtener el ID de la URL
const { searchParams } = new URL(window.location.href);
const id = searchParams.get("id");

if (id == null) window.location.href = "/"; // Redirigir si no hay ID

const url = getCldImageUrl({ src: id });
const previewUrl = ref(url);
const previewOpacity = ref(1);

const funnyPhrases: string[] = [
  "Hoy no respondo… ¡solo acepto dulces o travesuras!",
  "¿Asustado? ¡Yo solo estoy en modo lunes con disfraz!",
  "Me visto de fantasma para no tener que socializar. ¡Buh!",
  "Los vampiros me dijeron que me veían pálido… ¡Y eso que ya no salgo!",
  "Cazando fantasmas… pero primero, un café.",
];
const splitText = (text:string, maxLength = 35) => {
  const lines = []; // Array para almacenar las líneas
  let currentLine = ""; // Línea actual en construcción

  // Separar el texto en palabras
  const words = text.split(" ");

  for (const word of words) {
    // Verificar si añadir la nueva palabra excedería el límite
    if (currentLine.length + word.length + 1 <= maxLength) {
      currentLine += (currentLine ? " " : "") + word; // Añadir palabra a la línea actual
    } else {
      // Si se excede el límite, almacenar la línea actual y comenzar una nueva
      lines.push(currentLine);
      currentLine = word; // Comenzar una nueva línea con la palabra actual
    }
  }

  // Añadir la última línea si hay contenido
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines; // Devolver todas las líneas
};


const createOverlay = (text:string, yOffset:number, fontSize:number) => {
  console.log(yOffset)
  return {
    text: {
      text, // Texto a mostrar
      fontFamily: "Impact", // Tipo de fuente
      fontSize, // Tamaño de la fuente
      color: "#FFFFFF", // Color del texto,
      lineSpacing:100,
      letterSpacing:3
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
const selectedConfigParams = {
  blackwhite: getRandomString(randomColors) % 2 === 1,
  blurface: getRandomString(randomColors) % 2 === 1,
  cartoonify: getRandomString(randomColors) % 2 === 1,
  overlay: () => {
    const lines = splitText(getRandomString(funnyPhrases));
    return lines.map((line, index) => createOverlay(line, (lines.length - index - 1) * 120 + 30, 120)); 
  },
};

// Temas para los botones
const topics = {
  ghost: { label: "Add scary ghosts to the background" },
  zombies: { label: "Add zombies to the background" },
  devil: { label: "Add hello kitties to the background" },
};
// Temas para los botones
const topicList = [
  "Add scary ghosts to the background",
  "Add zombies to the background",
  "Add jungle to the background",
];

// Manejar clics en los botones
const handleClick = async () => {
 // console.log(await getImageDetails(id || ""))
  const newUrl = getCldImageUrl({
    src: id || "",
    replaceBackground: topicList[1],
    overlays: selectedConfigParams.overlay()
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

// Redes sociales
const socialNetworks = [
  { name: "Facebook", icon: Facebook },
  { name: "Twitter", icon: Twitter },
  { name: "Instagram", icon: Instagram },
];

const sharePhoto = (network) => {
  console.log(`Compartiendo en ${network}`);
};
</script>

<style scoped>

img {
  max-width: 100%;
  height: auto;
}
</style>
