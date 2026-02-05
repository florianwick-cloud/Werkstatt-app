import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ⚠️ WICHTIG: VitePWA komplett entfernt, damit KEIN Service Worker erzeugt wird

export default defineConfig({
  base: "/Werkstatt-app/",
  plugins: [
    react()
  ]
});
