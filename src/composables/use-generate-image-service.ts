import { ref } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import {
  GetImageDimensionsService,
  GenerateImageConfigService,
} from "@/cloudinary";
import { getGenerationServiceWrapper, SaveImageServiceWrapper } from "@/service-wrappers";

export function useGenerateImgService(
  id: string,
  urlOriginal: string,
  retryLimit = 2
) {
  const previewUrl = ref(urlOriginal);
  const previewOpacity = ref(1);
  const isGenerated = ref(false);
  const dataLoaded = ref(false);

  const generatePhoto = async (retryCount = 0) => {
    isGenerated.value = false;
    dataLoaded.value = false;

    try {
      const existGeneration = await getGenerationServiceWrapper.get(id);
      let url
        const { width, height } = await GetImageDimensionsService.get(id);
        const config = GenerateImageConfigService.getConfig();
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
        if(!existGeneration.length){
        await SaveImageServiceWrapper.post(id, false, url);
        }
        dataLoaded.value = true;
        previewOpacity.value = 1;
        isGenerated.value = true;
        
      };

      img.onerror = () => {
        if (retryCount < retryLimit) {
          generatePhoto(retryCount + 1);
        }
      };
    } catch (error) {
      console.error("Error generando la imagen:", error);
    }
  };
  const processPhotoOnload = async (retryCount = 0) => {
    isGenerated.value = false;
    dataLoaded.value = false;

    try {
      const existGeneration = await getGenerationServiceWrapper.get(id);
      let url
      if(!existGeneration.length){
        const { width, height } = await GetImageDimensionsService.get(id);
        const config = GenerateImageConfigService.getConfig();
         url = getCldImageUrl({
          src: id,
          replaceBackground: config.topic,
          overlays: config.overlay(width, height),
        });
      }else{
         url = existGeneration[0].cloudinaryUrl || "";
      }
     
      previewOpacity.value = 0.3;
      previewUrl.value = url;
      const img = new Image();
      img.src = url;

      img.onload = async () => {
        if(!existGeneration.length){
        await SaveImageServiceWrapper.post(id, false, url);
        }
        dataLoaded.value = true;
        previewOpacity.value = 1;
        isGenerated.value = true;
        
      };

      img.onerror = () => {
        if (retryCount < retryLimit) {
          processPhotoOnload(retryCount + 1);
        }
      };
    } catch (error) {
      console.error("Error generando la imagen:", error);
    }
  };

  return {
    processPhotoOnload,
    generatePhoto,
    previewUrl,
    previewOpacity,
    isGenerated,
    dataLoaded,
  };
}
    