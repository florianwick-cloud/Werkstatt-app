// src/storage/shelves.storage.ts
import { openDB } from "./db";
const STORE = "shelves";
/* =========================
   GET ALL SHELVES
   ========================= */
export async function getAllShelves() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Fehler beim Laden der Regale");
    });
}
/* =========================
   ADD SHELF
   ========================= */
export async function addShelf(shelf) {
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
export async function updateShelf(shelf) {
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
export async function deleteShelf(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Fehler beim Löschen des Regals");
    });
}
