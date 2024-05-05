import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: [
      { find: '@', replacement: '/src/*' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@service', replacement: '/src/service' },
      { find: '@validation', replacement: '/src/utils/validations.ts' },
      { find: '@auth-interface', replacement: '/src/types/interface/auth.ts' },
      { find: '@global-interface', replacement: '/src/types/interface/auth.ts' },
      { find: '@modals', replacement: '/src/components/modal' },
      { find: '@data-service', replacement: '/src/utils/data-service.ts' },
    ]
  }
})
