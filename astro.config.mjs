// @ts-check
import { defineConfig } from 'astro/config';
import fulldev from 'fulldev-ui/integration'
import vue from '@astrojs/vue';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  experimental: {
    contentLayer: true
  },
  integrations: [fulldev({
    colors: {
      theme: 'dark',
      dark: {
        background: '#1f1f1f',
        base: '#6f6d66',
        brand: '#f50'
      }
    }
  }), vue(), tailwind()]
});