// src/storage/tools.storage.ts

import type { Tool } from "../types/models";
import { openDB } from "./db";

const STORE = "tools";

/* =========================
   GET ALL TOOLS
   ========================= */
export async function getAllTools(): Promise<Tool[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Tool[]);
    request.onerror = () => reject("Fehler beim Laden der Werkzeuge");
  });
}

/* =========================
   ADD TOOL
   ========================= */
export async function addTool(tool: Tool): Promise<void> {
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
export async function updateTool(tool: Tool): Promise<void> {
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
export async function deleteTool(id: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Löschen des Werkzeugs");
  });
}
