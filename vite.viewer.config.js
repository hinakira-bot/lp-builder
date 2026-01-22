import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteSingleFile()],
    base: './',
    build: {
        outDir: 'dist_lp', // Different output folder than editor
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'viewer.html'),
            },
        },
    },
})
