<template>
  <Loading v-if="!dataLoaded" />
  <div class="min-h-screen bg-orange-900 flex items-center justify-center p-4 m-b-8">
    <div class="w-full md:max-w-3xl bg-black rounded-lg shadow-2xl p-b-12">
      <div class="p-6 space-y-6">
        <h1 class="text-4xl md:text-5xl md:text-4xl lg:text-3xl font-extrabold text-orange-500 text-center">
          Generador de imagenes Halloween
        </h1>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-4">
          <button @click="onHalloweenMeClick" class="py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50">
            HALLOWEEN ME
          </button>
        </div>

        <div class="relative inline-block overflow-hidden rounded-lg border-4 border-orange-500">
          <img v-if="!isGenerated" cloudinaryId="preview" :src="previewUrl" :style="{ opacity: previewOpacity }" class="object-cover w-full h-full" />
          <two-up v-else>
            <img cloudinaryId="original" :src="urlOriginal" class="object-cover w-full h-full" />
            <img cloudinaryId="preview" :src="previewUrl" :style="{ opacity: previewOpacity }" class="object-cover w-full h-full" />
          </two-up>
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
import { SaveImageServiceWrapper } from "@/service-wrappers/";
import OnGenerateActions from '@/components/on-generate-actions/on-generate-actions.vue';
import { useGenerateImgService } from '@/composables/';  

const { searchParams } = new URL(window.location.href);
const cloudinaryId = searchParams.get("cid") || "";
if (cloudinaryId == null) window.location.href = "/"; 
const urlOriginal = ref(getCldImageUrl({ src: cloudinaryId }));
const { processPhotoOnload,generatePhoto, previewUrl, previewOpacity, isGenerated, dataLoaded } = useGenerateImgService(cloudinaryId, urlOriginal.value);  // <-- Cambia el nombre de la función

onMounted(async () => {
  const img = new Image();
  img.src = previewUrl.value;

  img.onload = async () => {
    await processPhotoOnload(); 
  };
});

const onHalloweenMeClick = async () => {
  await generatePhoto();
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
