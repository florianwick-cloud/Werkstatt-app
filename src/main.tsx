import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// PWA-Registrierung über vite-plugin-pwa
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("Neue Version verfügbar");
  },
  onOfflineReady() {
    console.log("App ist offline bereit");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
