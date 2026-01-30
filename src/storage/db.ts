// src/storage/db.ts

import type { Shelf, Box, Tool, Material } from "../types/models";

const DB_NAME = "workshop-db";
const DB_VERSION = 1;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject("IndexedDB konnte nicht geöffnet werden");
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("shelves")) {
        db.createObjectStore("shelves", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("boxes")) {
        db.createObjectStore("boxes", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("tools")) {
        db.createObjectStore("tools", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("materials")) {
        db.createObjectStore("materials", { keyPath: "id" });
      }
    };
  });
}
