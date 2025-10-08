import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    // Configurando o site para testes
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['@testing-library/jest-dom'],
    }
})
