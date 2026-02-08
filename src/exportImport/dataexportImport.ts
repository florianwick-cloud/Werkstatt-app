// src/exportImport/dataExportImport.ts
import JSZip from "jszip";
import {
  getAllShelves,
} from "../storage/shelves.storage";
import {
  getAllBoxes,
} from "../storage/boxes.storage";
import {
  getAllMaterials,
} from "../storage/materials.storage";
import {
  getAllTools,
} from "../storage/tools.storage";
import { openDB } from "../storage/db";

const IMAGE_STORE = "images";

type ExportPayload = {
  version: number;
  exportedAt: string;
  shelves: any[];
  boxes: any[];
  materials: any[];
  tools: any[];
  images: { id: string; base64: string }[];
};

// -----------------------------------------------------
// HILFSFUNKTION: ALLE IMAGES LADEN
// -----------------------------------------------------
async function getAllImages(): Promise<{ id: string; base64: string }[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(IMAGE_STORE, "readonly");
    const store = tx.objectStore(IMAGE_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const result = (request.result ?? []) as any[];
      const mapped = result.map((r) => ({
        id: r.id,
        base64: r.base64,
      }));
      resolve(mapped);
    };

    request.onerror = () => reject("Fehler beim Laden der Bilder");
  });
}

// -----------------------------------------------------
// HILFSFUNKTION: STORE LEEREN
// -----------------------------------------------------
async function clearStore(name: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(name, "readwrite");
    const store = tx.objectStore(name);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(`Fehler beim Leeren von ${name}`);
  });
}

// -----------------------------------------------------
// HILFSFUNKTION: IMAGES SCHREIBEN
// -----------------------------------------------------
async function writeImages(images: { id: string; base64: string }[]) {
  const db = await openDB();
  const tx = db.transaction(IMAGE_STORE, "readwrite");
  const store = tx.objectStore(IMAGE_STORE);

  for (const img of images) {
    store.put({ id: img.id, base64: img.base64 }, img.id);
  }

  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// -----------------------------------------------------
// EXPORT: ALLE DATEN → ZIP (data.json)
// -----------------------------------------------------
export async function exportDataAsZip() {
  const [shelves, boxes, materials, tools, images] = await Promise.all([
    getAllShelves(),
    getAllBoxes(),
    getAllMaterials(),
    getAllTools(),
    getAllImages(),
  ]);

  const payload: ExportPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    shelves,
    boxes,
    materials,
    tools,
    images,
  };

  const zip = new JSZip();
  zip.file("data.json", JSON.stringify(payload, null, 2));

  const blob = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `workshop-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// -----------------------------------------------------
// IMPORT: ZIP → JSON → STORES ERSETZEN
// -----------------------------------------------------
export async function importDataFromFile(file: File): Promise<void> {
  const zip = await JSZip.loadAsync(file);
  const dataFile = zip.file("data.json");

  if (!dataFile) {
    throw new Error("data.json in ZIP nicht gefunden");
  }

  const jsonText = await dataFile.async("string");
  const payload = JSON.parse(jsonText) as ExportPayload;

  // Replace-Strategie: alles leeren, dann neu schreiben
  await Promise.all([
    clearStore("shelves"),
    clearStore("boxes"),
    clearStore("materials"),
    clearStore("tools"),
    clearStore("images"),
  ]);

  // Shelves
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(
      ["shelves", "boxes", "materials", "tools"],
      "readwrite"
    );

    const shelvesStore = tx.objectStore("shelves");
    const boxesStore = tx.objectStore("boxes");
    const materialsStore = tx.objectStore("materials");
    const toolsStore = tx.objectStore("tools");

    for (const s of payload.shelves) shelvesStore.put(s);
    for (const b of payload.boxes) boxesStore.put(b);
    for (const m of payload.materials) materialsStore.put(m);
    for (const t of payload.tools) toolsStore.put(t);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  // Images separat
  await writeImages(payload.images ?? []);
}
