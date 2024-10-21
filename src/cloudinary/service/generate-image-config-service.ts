import { funnyPhrases, topicList } from "@/data";
import {  getRandomStringArray } from "@/functions";
import { CreateOverlayService } from "./create-overlay-service";
import { type ThemeConfig } from "@/model";

export class GenerateImageConfigService {
    public static getConfig(formData:ThemeConfig){
      const topicIndex = this.getTopicIndex(formData.selectedBackground);
      const topic = topicIndex ==-1 ? 'Add '+formData.customBackground+' to the background':topicList[topicIndex];

        const selectedConfigParams = {
            topic ,
            overlay: (width: number, height: number) => {const textHeightPercentage = 0.25; 
              const availableHeightForText = height * textHeightPercentage;
              const fontSize = Math.min(width * 0.05, availableHeightForText);
              const randomPhrases = getRandomStringArray(funnyPhrases);
              const upperText = formData.input1 || randomPhrases[0];
              const lowerText = formData.input2 || randomPhrases[1];
      
              const upperYOffset = Math.round(height * 0.87); 
              const lowerYOffset = Math.round(height * 0.05); 
              const upperOverlay = CreateOverlayService.create(upperText, upperYOffset, fontSize);
              const lowerOverlay = CreateOverlayService.create(lowerText, lowerYOffset, fontSize); 
              return [upperOverlay, lowerOverlay];
            },
          };
          return selectedConfigParams
    }
      // Método para obtener el índice del topic según el selectedBackground
  private static getTopicIndex(selectedBackground: string): number {
    
    switch (selectedBackground) {
      case "fantasmas":
        return 0; // Índice para fantasmas
      case "zombies":
        return 1; // Índice para zombies
      case "brujas":
        return 2; // Índice para brujas
      case "personalizado":
          return -1; // Índice para brujas
      default :
        return 0; // Valor por defecto en caso de no coincidir
    }
  }
}
