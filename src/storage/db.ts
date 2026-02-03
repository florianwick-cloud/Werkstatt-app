// src/storage/db.ts

import type { Shelf, Box, Tool, Material } from "../types/models";

const DB_NAME = "workshop-db";
const DB_VERSION = 2; // ⭐ Wichtig: Version erhöht, damit Upgrade ausgeführt wird

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

      // ============================
      // UPGRADE: Version 1 → 2
      // ============================
      if (oldVersion < 2) {
        // Tools-Store neu anlegen, damit imageUrl sicher gespeichert wird
        if (db.objectStoreNames.contains("tools")) {
          db.deleteObjectStore("tools");
        }
        db.createObjectStore("tools", { keyPath: "id" });

        // Andere Stores nur anlegen, falls sie fehlen
        if (!db.objectStoreNames.contains("shelves")) {
          db.createObjectStore("shelves", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("boxes")) {
          db.createObjectStore("boxes", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("materials")) {
          db.createObjectStore("materials", { keyPath: "id" });
        }
      }
    };
  });
}
