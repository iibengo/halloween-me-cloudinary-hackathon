import { ref } from "vue";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import {
  GetImageDimensionsService
} from "@/cloudinary";
import { UpdateImageServiceWrapper } from "@/service-wrappers";

export function useEditImgService(
  id: string,
  internalId:string,
  urlOriginal: string,
  retryLimit = 2
) {
  const previewUrl = ref(urlOriginal);
  const previewOpacity = ref(1);
  const isGenerated = ref(true);
  const dataLoaded = ref(true);

  const editPhoto = async (config:any,userId:string,retryCount = 0) => {
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
        await UpdateImageServiceWrapper.post(internalId,url);
        dataLoaded.value = true;
        previewOpacity.value = 1;
        isGenerated.value = true;
        
      };

      img.onerror = () => {
        if (retryCount < retryLimit) {
          editPhoto(config,userId,retryCount + 1);
        }
      };
    } catch (error) {
      console.error("Error generando la imagen:", error);
    }
  };
 
  return {
   
    editPhoto,
    previewUrl,
    previewOpacity,
    isGenerated,
    dataLoaded,
  };
}
    