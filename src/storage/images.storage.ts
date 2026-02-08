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
   SAVE IMAGE (NEU) → erzeugt ID
   ========================= */
export async function saveNewImage(base64: string): Promise<string> {
  const db = await openDB();
  const id = crypto.randomUUID();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.put({ id, data: base64 }, id);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(id);
    tx.onerror = () => reject(tx.error);
  });
}

/* =========================
   SAVE IMAGE (MIT ID) → für IMPORT
   ========================= */
export async function saveImage(id: string, base64: string): Promise<void> {
  const db = await openDB();

  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);

  store.put({ id, data: base64 }, id);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/* =========================
   UPDATE IMAGE
   ========================= */
export async function updateImage(id: string, base64: string): Promise<void> {
  return saveImage(id, base64);
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
    request.onsuccess = () => resolve(request.result?.data ?? null);
    request.onerror = () => resolve(null);
  });
}

/* =========================
   GET ALL IMAGES
   ========================= */
export async function getAllImages(): Promise<{ id: string; data: string }[]> {
  const db = await openDB();

  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);

  const request = store.getAll();

  return new Promise((resolve) => {
    request.onsuccess = () => {
      const result = request.result ?? [];
      resolve(result.map((r: any) => ({ id: r.id, data: r.data })));
    };
    request.onerror = () => resolve([]);
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
