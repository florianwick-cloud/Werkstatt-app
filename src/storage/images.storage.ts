// src/storage/images.storage.ts
import { openDB } from "./db";

const STORE = "images";

/* =========================
   SAVE IMAGE BLOB
   ========================= */
export async function saveImage(id: string, blob: Blob): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.put(blob, id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Speichern des Bildes");
  });
}

/* =========================
   LOAD IMAGE (Safari-sicher)
   ========================= */
export async function loadImage(id: string): Promise<string> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const request = store.get(id);

    request.onsuccess = () => {
      const blob = request.result as Blob | undefined;

      if (!blob) {
        resolve("");
        return;
      }

      // Safari-sicher: Blob in File umwandeln
      const file = new File([blob], `${id}.png`, { type: blob.type });

      // Safari-sicher: neue URL erzeugen
      const url = URL.createObjectURL(file);

      resolve(url);
    };

    request.onerror = () => reject("Fehler beim Laden des Bildes");
  });
}
