import { registerSW } from "virtual:pwa-register";

export const updateSW = registerSW({
  onNeedRefresh() {
    console.log("Neue Version verfügbar");
  },
  onOfflineReady() {
    console.log("App ist offline bereit");
  },
});
