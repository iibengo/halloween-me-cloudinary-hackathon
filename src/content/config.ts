import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

const images = defineCollection({
  loader: cldAssetsLoader({
    limit: 4,
    folder: 'ioni-images'
  })
})

export const collections = {
  images
}