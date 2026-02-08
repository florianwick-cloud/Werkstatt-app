// src/exportImport/dataExportImport.ts
import JSZip from "jszip";
import { getAllShelves } from "../storage/shelves.storage";
import { getAllBoxes } from "../storage/boxes.storage";
import { getAllMaterials } from "../storage/materials.storage";
import { getAllTools } from "../storage/tools.storage";
import { openDB } from "../storage/db";

// -----------------------------------------------------
// EXPORT
// -----------------------------------------------------
export async function exportDataAsZip() {
  const [shelves, boxes, materials, tools] = await Promise.all([
    getAllShelves(),
    getAllBoxes(),
    getAllMaterials(),
    getAllTools(),
  ]);

  const zip = new JSZip();

  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    shelves,
    boxes,
    materials,
    tools, // enthält imageBase64 direkt im Tool
  };

  zip.file("data.json", JSON.stringify(payload, null, 2));

  const blob = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `workshop-backup-${new Date().toISOString().slice(0, 10)}.zip`;
  a.click();
  URL.revokeObjectURL(url);
}

// -----------------------------------------------------
// IMPORT
// -----------------------------------------------------
export async function importDataFromFile(file: File): Promise<void> {
  const zip = await JSZip.loadAsync(file);

  const dataFile = zip.file("data.json");
  if (!dataFile) throw new Error("data.json fehlt");

  const jsonText = await dataFile.async("string");
  const payload = JSON.parse(jsonText);

  // Stores leeren
  await Promise.all([
    clearStore("shelves"),
    clearStore("boxes"),
    clearStore("materials"),
    clearStore("tools"),
  ]);

  // JSON-Daten schreiben
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
}

// -----------------------------------------------------
// STORE LEEREN
// -----------------------------------------------------
async function clearStore(name: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(name, "readwrite");
    const store = tx.objectStore(name);
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
