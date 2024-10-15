import axios from "axios";

export class getPublicHalloweenMeListServiceWrapper {
  public static async get() {
    try {
      const response = await axios.get("/api/getPublicHalloweenMeListService");
     
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
}
