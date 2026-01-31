// src/storage/tools.storage.ts
import { openDB } from "./db";
const STORE = "tools";
/* =========================
   GET ALL TOOLS
   ========================= */
export async function getAllTools() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Fehler beim Laden der Werkzeuge");
    });
}
/* =========================
   ADD TOOL
   ========================= */
export async function addTool(tool) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const request = store.add(tool);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Fehler beim Hinzufügen des Werkzeugs");
    });
}
/* =========================
   UPDATE TOOL
   ========================= */
export async function updateTool(tool) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const request = store.put(tool);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Fehler beim Aktualisieren des Werkzeugs");
    });
}
/* =========================
   DELETE TOOL
   ========================= */
export async function deleteTool(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Fehler beim Löschen des Werkzeugs");
    });
}
