<template>
  <Loading v-if="!dataLoaded" />
  <div class="bg-orange-900">
    <div
      class="min-h-screen bg-orange-900 flex items-center justify-center p-4 m-b-8 pt-1"
    >
      <div class="w-full md:max-w-3xl rounded-lg shadow-2xl p-b-12">
        <TopMenu />
        <div class="w-full md:max-w-3xl bg-black rounded-lg shadow-2xl p-b-12">
          <div class="p-6 space-y-6">
            <h1
              class="text-4xl md:text-5xl md:text-4xl lg:text-3xl font-extrabold text-orange-500"
            >
              Generación de imagen
            </h1>

            <div class="relative flex justify-center items-center">
              <!-- Div para contener la imagen con el borde ajustado -->
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
                <img
                  v-else
                  cloudinaryId="preview"
                  :src="previewUrl"
                  :style="{ opacity: previewOpacity }"
                  class="object-cover max-w-full h-auto"
                />
              </div>
            </div>
            <div v-if="isGenerated">
              <OnGenerateActions
                :urlOriginal="urlOriginal"
                :previewUrl="previewUrl"
                :cloudinaryId="cloudinaryId"
                :showLike="true"
                :showEdit="showEdit"
                :internalId="internalId"
                :likes="likes"
                @liked="onLiked"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import "two-up-element";
import Loading from "../ui/loading.vue";
import OnGenerateActions from "@/components/vue/on-generate-actions/on-generate-actions.vue";
import TopMenu from "@/components/vue/top-menu/top-menu.vue";
import { getGenerationServiceWrapper } from "@/service-wrappers";
import { UpdateImageServiceWrapper } from "@/service-wrappers";
const props = defineProps({
  userId: {
    type: String,
    required: false,
  },
});
const { searchParams } = new URL(window.location.href);
const internalId = ref(searchParams.get("id") || "");

const cloudinaryId = ref("");
const showEdit = ref(false);
const isPublic = ref(0);
const likes = ref(0);
if (internalId.value == null) window.location.href = "/";
const urlOriginal = ref("");
const previewUrl = ref("");
const previewOpacity = ref(1);
const isGenerated = ref(false);
const dataLoaded = ref(false);
const onLiked = async () => {
  likes.value = likes.value + 1;
  await UpdateImageServiceWrapper.postLikes(internalId.value, likes.value);
};
onMounted(async () => {
  const existGeneration = await getGenerationServiceWrapper.getByInternal(
    internalId.value
  );
  if (!existGeneration.length) {
    window.location.href = "/";
  }
  previewUrl.value = existGeneration[0].cloudinaryUrl;
  cloudinaryId.value = existGeneration[0].cloudinaryId;
  const imgUserId = existGeneration[0].userId;
  likes.value = existGeneration[0].likes;
  isPublic.value = existGeneration[0].isPublic || false;
  if (props.userId === imgUserId) {
    showEdit.value = true;
  }
  urlOriginal.value = getCldImageUrl({ src: cloudinaryId.value });
  isGenerated.value = true;
  dataLoaded.value = true;
});
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
