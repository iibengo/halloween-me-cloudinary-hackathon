import { ref } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import {
  GetImageDimensionsService
} from "@/cloudinary";
import { SaveImageServiceWrapper } from "@/service-wrappers";

export function useGenerateImgService(
  id: string,
  urlOriginal: string,
  retryLimit = 2
) {
  const previewUrl = ref(urlOriginal);
  const previewOpacity = ref(1);
  const isGenerated = ref(false);
  const dataLoaded = ref(false);

  const generatePhoto = async (config:any,retryCount = 0) => {
    isGenerated.value = false;
    dataLoaded.value = false;

    try {
     let url
        const { width, height } = await GetImageDimensionsService.get(id);
         url = getCldImageUrl({
          src: id,
          replaceBackground: config.topic,
          overlays: config.overlay(width, height),
        });
      
     
      previewOpacity.value = 0.3;
      previewUrl.value = url;
      const img = new Image();
      img.src = url;

      img.onload = async () => {
        await SaveImageServiceWrapper.post(id, false, url);
        dataLoaded.value = true;
        previewOpacity.value = 1;
        isGenerated.value = true;
        
      };

      img.onerror = () => {
        if (retryCount < retryLimit) {
          generatePhoto(config,retryCount + 1);
        }
      };
    } catch (error) {
      console.error("Error generando la imagen:", error);
    }
  };
 
  return {
   
    generatePhoto,
    previewUrl,
    previewOpacity,
    isGenerated,
    dataLoaded,
  };
}
    