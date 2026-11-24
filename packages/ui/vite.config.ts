import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'index.js', cssFileName: 'styles' },
    rollupOptions: { external: /^(react($|\/)|react-dom($|\/)|@headlessui\/react$|@fortawesome\/)/ },
  },
})
