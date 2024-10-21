import axios from "axios";

export class SaveImageServiceWrapper {
  public static async post(
    cloudinaryId: string,
    original: boolean,
    cloudinaryUrl: string,
    userId:string
  ) {
    try {
    const likes = 0
    const isPublic = false;
    const response = await axios.post("/api/saveImageService", {
        cloudinaryId,
        original,
        cloudinaryUrl,
        likes,
        userId,
        isPublic
      });
      return response?.data.id || [];
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
}
