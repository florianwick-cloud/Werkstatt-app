// src/storage/db.ts

import type { Shelf, Box, Tool, Material } from "../types/models";

const DB_NAME = "workshop-db";
const DB_VERSION = 5; // ⭐ Neue Version, damit Stores sauber neu angelegt werden

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject("IndexedDB konnte nicht geöffnet werden");
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      const oldVersion = event.oldVersion;

      // ============================================================
      // VERSION 1 → 5: ALLE STORES SAUBER NEU ANLEGEN
      // ============================================================

      // Wir löschen ALLE Stores, die existieren.
      const stores = ["shelves", "boxes", "materials", "tools", "images"];
      for (const store of stores) {
        if (db.objectStoreNames.contains(store)) {
          db.deleteObjectStore(store);
        }
      }

      // Jetzt legen wir ALLE Stores sauber neu an.
      db.createObjectStore("shelves", { keyPath: "id" });
      db.createObjectStore("boxes", { keyPath: "id" });
      db.createObjectStore("materials", { keyPath: "id" });
      db.createObjectStore("tools", { keyPath: "id" });

      // Images ohne keyPath → wir speichern unter custom keys (toolId)
      db.createObjectStore("images");
    };
  });
}
