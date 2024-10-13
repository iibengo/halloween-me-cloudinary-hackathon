<template>
  <Loading v-if="!dataLoaded" />
  <div 
 
  class="min-h-screen  bg-orange-900 flex items-center justify-center p-4 m-b-8">
    
    <div class="w-full md:max-w-3xl bg-black rounded-lg shadow-2xl  p-b-12">
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
   <div   class="relative inline-block overflow-hidden rounded-lg border-4 border-orange-500">
    <two-up v-if="dataLoaded">
        <img id="original" :src="urlOriginal" class="object-cover w-full h-full" />
        <img
            id="preview"
            :src="previewUrl"
            :style="{ opacity: previewOpacity }"
            class="object-cover w-full h-full"
        />
    </two-up>
    <two-up v-else>
        <img id="original" :src=urlOriginal class="object-cover w-full h-full" />
        <img
            id="preview"
            :src=urlOriginal 
            :style="{ opacity: previewOpacity }"
            class="object-cover w-full h-full"
        />
    </two-up>
</div>
<small class="block text-sm text-gray-400 mt-1 max-w-xl overflow-x-auto whitespace-nowrap">
  {{ urlOriginal }}
</small>


        <!-- Botón de descarga -->
        <div >
          <button
            class="bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-orange-600"
            @click="handleDownload"
          >
            Descargar en Avif
          </button>
        </div>

        <!-- Botones para compartir en redes sociales -->
        <div class="flex justify-center space-x-4 p-6">
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
import { ref,onMounted } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import "two-up-element";
import { Facebook, Twitter, Instagram } from "lucide-vue-next";
import Loading from '../ui/loading.vue'
import axios from 'axios'
const loading=ref(true)
// Obtener el ID de la URL
const { searchParams } = new URL(window.location.href);
const id = searchParams.get("id");

if (id == null) window.location.href = "/"; // Redirigir si no hay ID
const urlOriginal=ref("")
const dataLoaded=ref(false)
const previewUrl = ref("");
const previewOpacity = ref(1);
const error = ref('');

onMounted(async ()=>{
  urlOriginal.value=  await getCldImageUrl({ src: id || "" });
  previewUrl.value=  urlOriginal.value;

  const img = new Image();
  img.src =  previewUrl.value;
  img.onload=()=>{
  dataLoaded.value=true; 
  }
})

// Variables para las frases
const funnyPhrases: string[][] = [
  ["Esta noche, solo acepto", "dulces, no preguntas."],
  ["¿Me asustas?", "¿o eres solo otro lunes?"],
  ["El disfraz de fantasma", "es mi forma de escapar."],
  ["Vampiros me dicen", "que no salgo lo suficiente."],
  ["Cazando fantasmas", "pero primero, ¡un bocadillo!"],
  ["Si ves a un zombi", "¡ofrécele un café!"],
  ["Soy un monstruo", "¡pero aún tengo estilo!"],
  ["Hoy es mi día de descanso", "de ser humano."],
  ["Este Halloween", "es solo otro día de trabajo."],
  ["¿Truco o trato?", "Yo solo quiero la pizza."],
];  



const createOverlay = (text:string, yOffset:number, fontSize:number) => {
 
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
const getRandomPhrase = (strings: string[][]): string[] => {
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
};

const selectedPhrase = getRandomPhrase(funnyPhrases);
//const upperPhrase = ref(selectedPhrase[0]);
//const lowerPhrase = ref(selectedPhrase[1]);

// Temas para los botones
const topicList = [
  "Add scary ghosts to the background",
  "Add zombies to the background",
  "Add jungle to the background",
];

const selectedConfigParams = {
  topic: getRandomString(topicList),
  overlay: (width:number,height:number) => {
    // Seleccionar una frase aleatoria que ya está dividida en dos partes
    const textHeightPercentage = 0.25; // 25% de la altura para cada texto
    const availableHeightForText = height * textHeightPercentage;
    
    const fontSize = Math.min(width * 0.08, availableHeightForText); // Elige el menor entre 8% del ancho o el alto permitido

    const [upperText, lowerText] = getRandomPhrase(funnyPhrases);
    const upperYOffset = Math.round(height * 0.85); // Ajusta la posición del texto superior (75% de la altura)
    const lowerYOffset = Math.round(height * 0.10); // Ajusta la posición del texto inferior (15% de la altura)
   
    // Crear el overlay para la frase superior
    const upperOverlay = createOverlay(upperText, upperYOffset, fontSize); // Ajusta yOffset y fontSize según sea necesario

    // Crear el overlay para la frase inferior
    const lowerOverlay = createOverlay(lowerText, lowerYOffset, fontSize); // Ajusta yOffset y fontSize según sea necesario

    // Retornar ambos overlays en un array
    return [upperOverlay, lowerOverlay];
  },
};
async function getImageDimensions(publicId:string) {
  try {
    const cloudName =  import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey =  import.meta.env.PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret =  import.meta.env.CLOUDINARY_API_SECRET;
    
    // Llamar a la API de Cloudinary para obtener detalles del recurso
    const response = await axios.get(
     `https://res.cloudinary.com/${cloudName}/image/upload/fl_getinfo/${publicId}`,
      {
        auth: {
          username: apiKey || "",
          password: apiSecret || "", 
        },
      }
    );
    const { width, height } = response.data.input;
    return { width, height };
  } catch (error) {
    console.error('Error al obtener las dimensiones de la imagen:', error);
  }
}
// Manejar clics en los botones
const handleClick = async () => {
 const {width,height}=await getImageDimensions(id || "")
  dataLoaded.value=false; 
  const newUrl = getCldImageUrl({
    src: id || "",
    replaceBackground: topicList[0],
    overlays: selectedConfigParams.overlay(width,height)
  });
  previewOpacity.value = 0.3; // Disminuir opacidad durante la carga
  previewUrl.value = newUrl;

  const img = new Image();
  img.src = newUrl;
  img.onload = () => {
    dataLoaded.value=true; 
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

const sharePhoto = (network) => {;
};
</script>

<style scoped>

img {
  max-width: 100%;
  height: auto;
}
</style>
