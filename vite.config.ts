import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

export default {
  server: {
    host: '0.0.0.0', // Umożliwia dostęp spoza localhost
    port: 3000, // Możesz zmienić port
  }
}
