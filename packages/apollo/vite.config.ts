import path from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs'],
      entry: path.resolve(__dirname, 'src/library.ts'),
      name: '@vue-storefront/shopify-apollo',
      fileName: (format) => `vsf-shopify-apollo.${format}.js`
    },
    outDir: 'lib',
    emptyOutDir: false,
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies)
      ]
    }
  }
})