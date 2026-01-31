// src/storage/boxes.storage.ts
import { openDB } from "./db";
const STORE = "boxes";
/* =========================
   GET ALL BOXES
   ========================= */
export async function getAllBoxes() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Fehler beim Laden der Kisten");
    });
}
/* =========================
   ADD BOX
   ========================= */
export async function addBox(box) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const request = store.add(box);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Fehler beim Hinzufügen der Kiste");
    });
}
/* =========================
   UPDATE BOX
   ========================= */
export async function updateBox(box) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const request = store.put(box);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Fehler beim Aktualisieren der Kiste");
    });
}
/* =========================
   DELETE BOX
   ========================= */
export async function deleteBox(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Fehler beim Löschen der Kiste");
    });
}
