// src/storage/materials.storage.ts

import type { Material } from "../types/models";
import { openDB } from "./db";

const STORE = "materials";

/* =========================
   GET ALL MATERIALS
   ========================= */
export async function getAllMaterials(): Promise<Material[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Material[]);
    request.onerror = () => reject("Fehler beim Laden der Materialien");
  });
}

/* =========================
   ADD MATERIAL
   ========================= */
export async function addMaterial(material: Material): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.add(material);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Hinzufügen des Materials");
  });
}

/* =========================
   UPDATE MATERIAL
   ========================= */
export async function updateMaterial(material: Material): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.put(material);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Aktualisieren des Materials");
  });
}

/* =========================
   DELETE MATERIAL
   ========================= */
export async function deleteMaterial(id: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Fehler beim Löschen des Materials");
  });
}
