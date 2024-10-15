import { ref } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import {
  GetImageDimensionsService,
  GenerateImageConfigService,
} from "@/cloudinary";

export function useGenerateImgService(
  id: string,
  urlOriginal: string,
  retryLimit = 2
) {
  const previewUrl = ref(urlOriginal);
  const previewOpacity = ref(1);
  const isGenerated = ref(false);
  const dataLoaded = ref(false);

  const generateImg = async (retryCount = 0) => {
    isGenerated.value = false;
    dataLoaded.value = false;

    try {
      const { width, height } = await GetImageDimensionsService.get(id);
      const config = GenerateImageConfigService.getConfig();
      const newUrl = getCldImageUrl({
        src: id,
        replaceBackground: config.topic,
        overlays: config.overlay(width, height),
      });
      previewOpacity.value = 0.3;
      previewUrl.value = newUrl;
      const img = new Image();
      img.src = newUrl;

      img.onload = () => {
        dataLoaded.value = true;
        previewOpacity.value = 1;
        isGenerated.value = true;
      };

      img.onerror = () => {
        if (retryCount < retryLimit) {
          generateImg(retryCount + 1);
        }
      };
    } catch (error) {
      console.error("Error generando la imagen:", error);
    }
  };

  return {
    generateImg,
    previewUrl,
    previewOpacity,
    isGenerated,
    dataLoaded,
  };
}
    