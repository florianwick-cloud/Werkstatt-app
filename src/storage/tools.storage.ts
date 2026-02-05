// src/storage/tools.storage.ts

import type { Tool } from "../types/models";
import { openDB } from "./db";

const STORE = "tools";

/* =========================
   MIGRATION: Entfernt alte Blob-URLs
   ========================= */
function sanitizeTool(raw: any): Tool {
  const clean: Tool = {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    shelfId: raw.shelfId,
    boxId: raw.boxId ?? null,
    imageBase64: null,
  };

  // Falls alte Felder existieren → ignorieren
  const img =
    raw.imageBase64 ??
    raw.imageUrl ?? // altes Feld
    null;

  // Blob-URLs entfernen
  if (typeof img === "string" && img.startsWith("blob:")) {
    clean.imageBase64 = null;
  } else if (typeof img === "string") {
    clean.imageBase64 = img;
  }

  return clean;
}

/* =========================
   GET ALL TOOLS
   ========================= */
export async function getAllTools(): Promise<Tool[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const rawTools = request.result as any[];
      const cleaned = rawTools.map(sanitizeTool);
      resolve(cleaned);
    };

    request.onerror = () => reject("Fehler beim Laden der Werkzeuge");
  });
}

/* =========================
   ADD TOOL
   ========================= */
export async function addTool(tool: Tool): Promise<void> {
  const db = await openDB();

  // Sicherheit: Nur erlaubte Felder speichern
  const safeTool: Tool = {
    id: tool.id,
    name: tool.name,
    description: tool.description,
    shelfId: tool.shelfId,
    boxId: tool.boxId,
    imageBase64: tool.imageBase64 ?? null,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.add(safeTool);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Hinzufügen des Werkzeugs");
  });
}

/* =========================
   UPDATE TOOL
   ========================= */
export async function updateTool(tool: Tool): Promise<void> {
  const db = await openDB();

  const safeTool: Tool = {
    id: tool.id,
    name: tool.name,
    description: tool.description,
    shelfId: tool.shelfId,
    boxId: tool.boxId,
    imageBase64: tool.imageBase64 ?? null,
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.put(safeTool);

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
