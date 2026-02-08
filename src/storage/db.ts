// src/storage/db.ts

import type { Shelf, Box, Tool, Material } from "../types/models";

const DB_NAME = "workshop-db";
const DB_VERSION = 6;

// ⭐ Singleton: verhindert mehrfaches Öffnen & Endlosschleifen
let dbPromise: Promise<IDBDatabase> | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject("IndexedDB konnte nicht geöffnet werden");
    };

    request.onsuccess = () => {
      const db = request.result;

      // DEBUG
      console.log("IndexedDB geöffnet.");
      console.log("DB-Version:", db.version);
      console.log("Stores:", Array.from(db.objectStoreNames));

      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = request.result;
      const oldVersion = event.oldVersion;

      console.log(
        `IndexedDB Upgrade: alte Version ${oldVersion} → neue Version ${DB_VERSION}`
      );

      const stores = ["shelves", "boxes", "materials", "tools", "images"];

      // Alte Stores löschen
      for (const store of stores) {
        if (db.objectStoreNames.contains(store)) {
          console.log(`Lösche alten Store: ${store}`);
          db.deleteObjectStore(store);
        }
      }

      console.log("Lege Stores neu an…");

      db.createObjectStore("shelves", { keyPath: "id" });
      db.createObjectStore("boxes", { keyPath: "id" });
      db.createObjectStore("materials", { keyPath: "id" });
      db.createObjectStore("tools", { keyPath: "id" });

      // Images ohne keyPath → wir speichern unter custom keys (toolId)
      db.createObjectStore("images");

      console.log("Alle Stores erfolgreich neu angelegt.");
    };
  });

  return dbPromise;
}
