import axios from "axios";

export class SaveImageServiceWrapper {
  public static async post(
    cloudinaryId: string,
    original: boolean,
    cloudinaryUrl: string
  ) {
    try {
      const response = await axios.post("/api/saveImageService", {
        cloudinaryId,
        original,
        cloudinaryUrl,
      });
      console.log(response.data); // Respuesta del servidor
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
}
