import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';


// https://astro.build/config
export default defineConfig({
  output: 'server',
  experimental: {
    contentLayer: true
  },
  integrations: [ vue(), tailwind()],
  adapter: vercel(), 

});