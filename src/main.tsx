// src/main.ts
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// ======================================
// 1. Cache beim Laden löschen
// ======================================
async function clearCachesOnLoad() {
  if ("caches" in window) {
    try {
      const keys = await caches.keys();
      for (const key of keys) {
        await caches.delete(key);
      }
      console.log("Alle Caches gelöscht.");
    } catch (err) {
      console.warn("Cache konnte nicht gelöscht werden:", err);
    }
  }
}

// ======================================
// 2. Service Worker registrieren
// ======================================
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    // Dynamischer Pfad für Vite + GitHub Pages
    const swPath = `${import.meta.env.BASE_URL}service-worker.js`;

    navigator.serviceWorker
      .register(swPath)
      .then(() => console.log("Service Worker registriert:", swPath))
      .catch((err) =>
        console.warn("SW Registrierung fehlgeschlagen:", err, swPath)
      );
  }
}

// ======================================
// 3. App starten
// ======================================
async function start() {
  await clearCachesOnLoad();
  registerServiceWorker();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}

start();
