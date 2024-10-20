<template>
  <Loading v-if="!dataLoaded" />
  <div class="min-h-screen bg-orange-900 flex items-center justify-center p-4 m-b-8">
    <div class="w-full md:max-w-3xl rounded-lg shadow-2xl p-b-12">
      <TopMenu />
      <div class="w-full md:max-w-3xl bg-black rounded-lg shadow-2xl p-b-12">

      
      <div class="p-6 space-y-6">
        <h1 class="text-2xl md:text-2xl md:text-4xl lg:text-3xl font-extrabold text-orange-500 text-center">
          Generador de imagenes Halloween
        </h1>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-4">
          <button @click="onHalloweenMeClick" class="flex py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50">
            <img src="assets/icon/pumpkin.svg" alt="Pumpkin Icon" class="w-6 h-6 mr-2" />
            <span>Regenerar imagen</span><img src="assets/icon/pumpkin.svg" alt="Pumpkin Icon" class="w-6 h-6 ml-2" />
        
          </button>
      
          <button
        @click="openModal"
        class="p-2 md:p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 border border-orange-600"
      >
        <p class="text-1xl md:text-1xl font-extrabold text-orange-500 text-center flex items-center space-x-2 hover:text-white">
          <i class="fa fa-paint-brush" aria-hidden="true"></i>  
          <span>Cambiar tema</span>
        </p>
      </button>
        </div>

        <div class="relative flex justify-center items-center">
  <!-- Div para contener la imagen o el componente two-up con el borde ajustado -->
  <div class="inline-block overflow-hidden rounded-lg border-4 border-orange-500">
    <img v-if="!isGenerated" cloudinaryId="preview" :src="previewUrl" :style="{ opacity: previewOpacity }" class="object-cover max-w-full h-auto" />
    
    <two-up v-else>
      <img cloudinaryId="original" :src="urlOriginal" class="object-cover max-w-full h-auto" />
      <img cloudinaryId="preview" :src="previewUrl" :style="{ opacity: previewOpacity }" class="object-cover max-w-full h-auto" />
    </two-up>
  </div>
</div>


        <div v-if="isGenerated">
          <OnGenerateActions :urlOriginal="urlOriginal" :previewUrl="previewUrl" :cloudinaryId="cloudinaryId" />
        </div>

      </div>
    </div>
  </div>
 </div>
 <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
              <h2 class="text-xl font-bold text-orange-500 mb-4">Opciones de Configuración</h2>
              
              <form @submit.prevent="submitForm">
                <div class="mb-4">
                  <label for="input1" class="block text-sm font-medium text-gray-700">Texto Superior</label>
                  <input type="text" id="input1" v-model="input1" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
                </div>
                
                <div class="mb-4">
                  <label for="input2" class="block text-sm font-medium text-gray-700">Texto Inferior</label>
                  <input type="text" id="input2" v-model="input2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
                </div>

                <div class="mb-4">
                  <label for="select" class="block text-sm font-medium text-gray-700">Elegir Opción</label>
                  <select id="select" v-model="selectedOption" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm">
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                  </select>
                </div>

                <div class="flex justify-end">
                  <button type="button" @click="closeModal" class="mr-4 py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">Cancelar</button>
                  <button type="submit" class="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">Guardar</button>
                </div>
              </form>
            </div>
          </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import "two-up-element";
import Loading from "../ui/loading.vue";
import { navigate } from "astro:transitions/client";
import OnGenerateActions from '@/components/vue/on-generate-actions/on-generate-actions.vue';
import { useGenerateImgService } from '@/composables/';  
import TopMenu from '@/components/vue/top-menu/top-menu.vue';
import {
  GenerateImageConfigService,
} from "@/cloudinary";

const { searchParams } = new URL(window.location.href);
const id = searchParams.get("cid") || "";
const isModalOpen = ref(false);
const input1 = ref("");
const input2 = ref("");
const selectedOption = ref("");
if (id == null) window.location.href = "/"; 
const urlOriginal = ref(getCldImageUrl({ src: id }));
const { generatePhoto, previewUrl, previewOpacity, isGenerated, dataLoaded } = useGenerateImgService(id, urlOriginal.value);  // <-- Cambia el nombre de la función

onMounted(async () => {
  const img = new Image();
  img.src = previewUrl.value;
  img.onload = async () => {
    
  const config = GenerateImageConfigService.getConfig();
    await generatePhoto(config); 
  };
});

const onHalloweenMeClick = async () => {

  const config = GenerateImageConfigService.getConfig(1);
  await generatePhoto(config);
};

const onNewClick = async () => {
  navigate(`/`);
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = () => {
  closeModal();
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
