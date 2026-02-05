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

  await db.put(STORE, { id, base64 });

  return id;
}

/* =========================
   UPDATE IMAGE
   ========================= */
export async function updateImage(id: string, base64: string): Promise<void> {
  const db = await openDB();
  await db.put(STORE, { id, base64 });
}

/* =========================
   LOAD IMAGE
   ========================= */
export async function loadImage(id: string): Promise<string | null> {
  const db = await openDB();
  const entry = await db.get(STORE, id);
  return entry?.base64 ?? null;
}

/* =========================
   DELETE IMAGE
   ========================= */
export async function deleteImage(id: string): Promise<void> {
  const db = await openDB();
  await db.delete(STORE, id);
}
