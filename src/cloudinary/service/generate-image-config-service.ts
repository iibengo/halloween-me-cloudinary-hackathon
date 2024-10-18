import { funnyPhrases, topicList } from "@/data";
import {  getRandomStringArray } from "@/functions";
import { CreateOverlayService } from "./create-overlay-service";

export class GenerateImageConfigService {
    public static getConfig(topicIndex=0){
        const selectedConfigParams = {
            topic: topicList[topicIndex],
            overlay: (width: number, height: number) => {const textHeightPercentage = 0.25; 
              const availableHeightForText = height * textHeightPercentage;
              const fontSize = Math.min(width * 0.05, availableHeightForText);
              const [upperText, lowerText] = getRandomStringArray(funnyPhrases);
              const upperYOffset = Math.round(height * 0.87); 
              const lowerYOffset = Math.round(height * 0.05); 
              const upperOverlay = CreateOverlayService.create(upperText, upperYOffset, fontSize);
              const lowerOverlay = CreateOverlayService.create(lowerText, lowerYOffset, fontSize); 
              return [upperOverlay, lowerOverlay];
            },
          };
          return selectedConfigParams
    }
}