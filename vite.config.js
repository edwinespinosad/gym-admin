import { fileURLToPath, URL } from 'node:url'

import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
const path = require('path')
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    Components({
      resolvers: [VuetifyResolver()]
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    {
      name: 'sass',
      renderChunk: (code) => require('sass').renderSync({ data: code }).css,
      transform: (code, id) => {
        if (id.endsWith('.scss') || id.endsWith('.sass')) {
          return sass.renderSync({ file: id }).css.toString();
        }
      },
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
