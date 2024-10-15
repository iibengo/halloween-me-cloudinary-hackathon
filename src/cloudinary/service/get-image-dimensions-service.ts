import axios from "axios";

export class GetImageDimensionsService {
  public static async get(id: string) {
    try {
      const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
      const response = await axios.get(
        `https://res.cloudinary.com/${cloudName}/image/upload/fl_getinfo/${id}`
      );
      const width = (response.data.input.width as number) ;
      const height = (response.data.input.height as number) ;
      return { width, height };
    } catch (error) {
      return { width: 500, height: 500};
    }
  }
}
