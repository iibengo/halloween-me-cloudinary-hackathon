import axios from "axios";

export class UpdateImageServiceWrapper {
  public static async post(
    id: string,
    cloudinaryUrl: string,
  
  ) {
    try {
    await axios.post("/api/updateImageService", {
        id,
        cloudinaryUrl,
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
  public static async postLikes(
    id: string,
    likes: number,
  
  ) {
    try {
    await axios.post("/api/updateImageService", {
        id,
        likes,
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
  public static async postPublic(
    id: string,
    isPublic: string,
  
  ) {
    try {
    await axios.post("/api/updateImageService", {
        id,
        isPublic,
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
}
