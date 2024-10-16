<template>
  <Loading v-if="!dataLoaded" />
  <div class="min-h-screen bg-orange-900 flex items-center justify-center p-4 m-b-8">
    <div class="w-full md:max-w-3xl bg-black rounded-lg shadow-2xl p-b-12">
      <div class="p-6 space-y-6">
        <h1 class="text-4xl md:text-5xl md:text-4xl lg:text-3xl font-extrabold text-orange-500 text-center">
          Generación de imagenes Halloween
        </h1>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-4">
          <button @click="onHalloweenMeClick" class="py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50">
            HALLOWEEN ME 
          </button>
        </div>

        <div class="relative flex justify-center items-center">
  <!-- Div para contener la imagen con el borde ajustado -->
  <div class="inline-block overflow-hidden rounded-lg border-4 border-orange-500">
    <img v-if="!isGenerated" cloudinaryId="preview" :src="previewUrl" :style="{ opacity: previewOpacity }" class="object-cover max-w-full h-auto" />
    <img v-else cloudinaryId="preview" :src="previewUrl" :style="{ opacity: previewOpacity }" class="object-cover max-w-full h-auto" />
  </div>
</div>
        <div v-if="isGenerated">
          <OnGenerateActions :urlOriginal="urlOriginal" :previewUrl="previewUrl" :cloudinaryId="cloudinaryId" />
        </div>
        <div class="flex mt-0 p-0">
          <span class="text-orange-500">Imagen original: </span>
          <small class="ml-4 block text-sm text-gray-400 mt-1 max-w-sm overflow-x-auto whitespace-nowrap">
            {{ urlOriginal }}
          </small>
        </div>
        <button @click="onNewClick" class="text-sm py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50">
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
import { navigate } from "astro:transitions/client";
import OnGenerateActions from '@/components/on-generate-actions/on-generate-actions.vue';
import { getGenerationServiceWrapper } from "@/service-wrappers";

const { searchParams } = new URL(window.location.href);
const internalId = searchParams.get("id") || "";

const cloudinaryId =ref("");
if (internalId == null) window.location.href = "/"; 
const urlOriginal = ref("");
const previewUrl = ref("");
  const previewOpacity = ref(1);
  const isGenerated = ref(false);
  const dataLoaded = ref(false);
onMounted(async () => {
   const existGeneration = await getGenerationServiceWrapper.getByInternal(internalId);
  if(!existGeneration.length){
    window.location.href = "/"; 
  }
  previewUrl.value=existGeneration[0].cloudinaryUrl
  cloudinaryId.value=existGeneration[0].cloudinaryId
  urlOriginal.value = getCldImageUrl({ src: cloudinaryId.value })
  isGenerated.value=true;
  dataLoaded.value=true;
  
});

const onHalloweenMeClick =  () => {
  navigate(`/photo?cid=${cloudinaryId.value}`);
};

const onNewClick = async () => {
  navigate(`/`);
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
