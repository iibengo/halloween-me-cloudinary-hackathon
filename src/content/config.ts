import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

const hackathonImg = defineCollection({
  loader: cldAssetsLoader({
    limit: 4,
    folder: 'hackathonImg'
  })
})

export const collections = {
  hackathonImg
}