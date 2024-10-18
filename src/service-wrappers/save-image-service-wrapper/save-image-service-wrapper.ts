import axios from "axios";

export class SaveImageServiceWrapper {
  public static async post(
    cloudinaryId: string,
    original: boolean,
    cloudinaryUrl: string
  ) {
    try {
    const likes = 0
    await axios.post("/api/saveImageService", {
        cloudinaryId,
        original,
        cloudinaryUrl,
        likes
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
}
