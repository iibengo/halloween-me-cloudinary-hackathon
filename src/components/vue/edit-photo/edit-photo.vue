<template>
  <Loading v-if="!dataLoaded" />
  <div
    class="min-h-screen bg-orange-900 flex items-center justify-center p-4 m-b-8"
  >
    <div class="w-full md:max-w-3xl rounded-lg shadow-2xl p-b-12">
      <TopMenu />
      <div class="w-full md:max-w-3xl bg-black rounded-lg shadow-2xl p-b-12">
        <div class="p-6 space-y-6">
          <h1
            class="text-2xl md:text-2xl md:text-4xl lg:text-3xl font-extrabold text-orange-500 text-center"
          >
            Generador de imagenes Halloween
          </h1>
          <div
            class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-4"
          >
            <button
              @click="onHalloweenMeClick"
              class="flex py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
            >
              <span>🦇 Regenerar imagen 🦇</span>
            </button>

            <button
              @click="openModal"
              class="p-2 md:p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 border border-orange-600"
            >
              <p
                class="text-1xl md:text-1xl font-extrabold text-orange-500 text-center flex items-center space-x-2 hover:text-white"
              >
                <i class="fa fa-paint-brush" aria-hidden="true"></i>
                <span> Cambiar tema </span>
              </p>
            </button>
          </div>

          <div class="relative flex justify-center items-center">
            <!-- Div para contener la imagen o el componente two-up con el borde ajustado -->
            <div
              class="inline-block overflow-hidden rounded-lg border-4 border-orange-500"
            >
              <img
                v-if="!isGenerated"
                cloudinaryId="preview"
                :src="previewUrl"
                :style="{ opacity: previewOpacity }"
                class="object-cover max-w-full h-auto"
              />

              <two-up v-else>
                <img
                  cloudinaryId="original"
                  :src="urlOriginal"
                  class="object-cover max-w-full h-auto"
                />
                <img
                  cloudinaryId="preview"
                  :src="previewUrl"
                  :style="{ opacity: previewOpacity }"
                  class="object-cover max-w-full h-auto"
                />
              </two-up>
            </div>
          </div>

          <div v-if="isGenerated">
            <OnGenerateActions
              :urlOriginal="urlOriginal"
              :previewUrl="previewUrl"
              :cloudinaryId="cloudinaryId"
              :showPublic="true"
              @isPublic="clickPublic"
              :isPublic="isPublic"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <SelectTheme
      :isModalOpen="isModalOpen"
      @closeModal="isModalOpen = false"
      @submitForm="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import "two-up-element";
import Loading from "../ui/loading.vue";
import { navigate } from "astro:transitions/client";
import OnGenerateActions from "@/components/vue/on-generate-actions/on-generate-actions.vue";
import { useEditImgService } from "@/composables/";
import TopMenu from "@/components/vue/top-menu/top-menu.vue";
import SelectTheme from "@/components/vue/dialog/select-theme.vue";
import { GenerateImageConfigService } from "@/cloudinary";
import { type ThemeConfig } from "@/model";
import { getGenerationServiceWrapper ,UpdateImageServiceWrapper} from "@/service-wrappers";

const { searchParams } = new URL(window.location.href);
const id = searchParams.get("cid") || "";
const iid = searchParams.get("iid") || "";
const isModalOpen = ref(false);
const input1 = ref("");
const input2 = ref("");
const selectedOption = ref("");
const urlOriginal = ref(getCldImageUrl({ src: id }));
const isPublic = ref(false);
const { editPhoto, previewUrl, previewOpacity, isGenerated, dataLoaded,internalId } =
  useEditImgService(id, iid, urlOriginal.value);
const themeConfig = ref<ThemeConfig>({
  input1: "",
  input2: "",
  selectedTheme: "fondo-texto",
  selectedBackground: "fantasmas",
  customBackground: "",
});
const props = defineProps({
  userId: {
    type: String,
    required: false,
  },
});
const clickPublic = async ()=>{
  isPublic.value= !isPublic.value
  await UpdateImageServiceWrapper.postPublic(iid,isPublic.value);
}
onMounted(async () => {
  const img = new Image();
  img.src = previewUrl.value;
  const existGeneration = await getGenerationServiceWrapper.getByInternal(iid);
  if (!existGeneration.length) {
    //   window.location.href = "/";
  }
  previewUrl.value = existGeneration[0].cloudinaryUrl;
  isPublic.value = existGeneration[0].isPublic;
});

const onHalloweenMeClick = async () => {
  const config = GenerateImageConfigService.getConfig(themeConfig.value);
  await editPhoto(config, props.userId);
};
const handleSubmit = async (themeConfig: ThemeConfig) => {
  themeConfig.value = themeConfig;
  const config = GenerateImageConfigService.getConfig(themeConfig.value);
  await editPhoto(config, props.userId);
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
