import axios from "axios";

export class getGenerationServiceWrapper {
  public static async get(cloudinaryId: string) {
    try {
      const response = await axios.post("/api/getGenerationService", {
    
        cloudinaryId,
      });
      return response?.data.data || [];
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  } public static async getByInternal(imgId: string) {
    try {
      const response = await axios.post("/api/getGenerationService", {
    
        imgId,
      });
      return response?.data.data || [];
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
}
