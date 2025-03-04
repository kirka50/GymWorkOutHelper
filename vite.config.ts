import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {ManifestOptions, VitePWA} from "vite-plugin-pwa";
import  tailwindcss from '@tailwindcss/vite';
import path from "path";

const manifest: Partial<ManifestOptions> | false = {
    "theme_color": "#cf24ff",
    "background_color": "#fafafa",
    "icons": [{
        "purpose": "maskable",
        "sizes": "512x512",
        "src": "icon512_maskable.png",
        "type": "image/png"
    }, {"purpose": "any", "sizes": "512x512", "src": "icon512_rounded.png", "type": "image/png"}],
    "orientation": "any",
    "display": "standalone",
    "lang": "ru-RU",
    "name": "GymWorkOut helper",
    "short_name": "Gym helper",
    "start_url": "/"
}

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
            },
            manifest: manifest
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
