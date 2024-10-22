import { funnyPhrases_es, funnyPhrases_en, topicList } from "@/data";
import { getRandomStringArray } from "@/functions";
import { CreateOverlayService } from "./create-overlay-service";
import { type ThemeConfig } from "@/model";

export class GenerateImageConfigService {
  public static getConfig(formData: ThemeConfig, isEnglish: boolean = false) {
    const topicIndex = this.getTopicIndex(formData.selectedBackground);
    const topic =
      formData.selectedTheme === "solo-fondo" ||
      formData.selectedTheme === "fondo-texto"
        ? topicIndex == -1
          ? "Add " + formData.customBackground + " to the background"
          : topicList[topicIndex]
        : undefined;
    const funnyPhrases = isEnglish ? funnyPhrases_en : funnyPhrases_es;
    const showText =  formData.selectedTheme === "solo-texto" ||
      formData.selectedTheme === "fondo-texto"
    const selectedConfigParams = {
      topic,
      overlay:showText? (width: number, height: number) => {
        const textHeightPercentage = 0.25;
        const availableHeightForText = height * textHeightPercentage;
        const fontSize = Math.min(width * 0.05, availableHeightForText);
        const randomPhrases = getRandomStringArray(funnyPhrases);
        const upperText = formData.input1 || randomPhrases[0];
        const lowerText = formData.input2 || randomPhrases[1];

        const upperYOffset = Math.round(height * 0.87);
        const lowerYOffset = Math.round(height * 0.05);
        const upperOverlay = CreateOverlayService.create(
          upperText,
          upperYOffset,
          fontSize
        );
        const lowerOverlay = CreateOverlayService.create(
          lowerText,
          lowerYOffset,
          fontSize
        );
        return [upperOverlay, lowerOverlay];
      }:()=>undefined,
    };
    return selectedConfigParams;
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
      default:
        return 0; // Valor por defecto en caso de no coincidir
    }
  }
}
