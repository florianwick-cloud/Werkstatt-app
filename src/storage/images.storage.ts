// src/storage/images.storage.ts
import { openDB } from "./db";

const STORE = "images";

/* =========================
   BLOB → BASE64
   ========================= */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/* =========================
   SAVE IMAGE (BASE64)
   ========================= */
export async function saveImage(base64: string): Promise<string> {
  const db = await openDB();
  const id = crypto.randomUUID();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.put({ id, base64 }, id);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(id);
    tx.onerror = () => reject(tx.error);
  });
}

/* =========================
   UPDATE IMAGE
   ========================= */
export async function updateImage(id: string, base64: string): Promise<void> {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.put({ id, base64 }, id);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* =========================
   LOAD IMAGE
   ========================= */
export async function loadImage(id: string): Promise<string | null> {
  const db = await openDB();

  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);

  const request = store.get(id);

  return new Promise((resolve) => {
    request.onsuccess = () => resolve(request.result?.base64 ?? null);
    request.onerror = () => resolve(null);
  });
}

/* =========================
   DELETE IMAGE
   ========================= */
export async function deleteImage(id: string): Promise<void> {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.delete(id);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
