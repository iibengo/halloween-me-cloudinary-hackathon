import { funnyPhrases, topicList } from "@/data";
import {  getRandomStringArray } from "@/functions";
import { CreateOverlayService } from "./create-overlay-service";

export class GenerateImageConfigService {
    public static getConfig(){
        const selectedConfigParams = {
            topic: topicList[0],//getRandomString(topicList),
            overlay: (width: number, height: number) => {const textHeightPercentage = 0.25; 
              const availableHeightForText = height * textHeightPercentage;
              const fontSize = Math.min(width * 0.08, availableHeightForText);
              const [upperText, lowerText] = getRandomStringArray(funnyPhrases);
              const upperYOffset = Math.round(height * 0.85); 
              const lowerYOffset = Math.round(height * 0.1); 
              const upperOverlay = CreateOverlayService.create(upperText, upperYOffset, fontSize);
              const lowerOverlay = CreateOverlayService.create(lowerText, lowerYOffset, fontSize); 
              return [upperOverlay, lowerOverlay];
            },
          };
          return selectedConfigParams
    }
}