import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const { VERCEL_ENV, VERCEL_GIT_COMMIT_REF } = loadEnv(mode, '.', 'VERCEL_')
  const gitRef = VERCEL_ENV === 'preview' ? VERCEL_GIT_COMMIT_REF || 'main' : 'main'
  return {
    plugins: [react(), tailwindcss()],
    define: { __DOCS_GIT_REF__: JSON.stringify(gitRef) },
    server: { host: '127.0.0.1', port: 8897, strictPort: true },
  }
})
