// src/storage/shelves.storage.ts

import type { Shelf } from "../types/models";
import { openDB } from "./db";

const STORE = "shelves";

/* =========================
   GET ALL SHELVES
   ========================= */
export async function getAllShelves(): Promise<Shelf[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Shelf[]);
    request.onerror = () => reject("Fehler beim Laden der Regale");
  });
}

/* =========================
   ADD SHELF
   ========================= */
export async function addShelf(shelf: Shelf): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.add(shelf);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Hinzufügen des Regals");
  });
}

/* =========================
   UPDATE SHELF
   ========================= */
export async function updateShelf(shelf: Shelf): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.put(shelf);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Aktualisieren des Regals");
  });
}

/* =========================
   DELETE SHELF
   ========================= */
export async function deleteShelf(id: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Löschen des Regals");
  });
}
