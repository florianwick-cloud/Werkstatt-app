// src/exportImport/dataExportImport.ts
import JSZip from "jszip";
import { getAllShelves } from "../storage/shelves.storage";
import { getAllBoxes } from "../storage/boxes.storage";
import { getAllMaterials } from "../storage/materials.storage";
import { getAllTools } from "../storage/tools.storage";
import { openDB } from "../storage/db";
import { getAllImages, saveImage } from "../storage/images.storage";

// -----------------------------------------------------
// EXPORT
// -----------------------------------------------------
export async function exportDataAsZip() {
  const [shelves, boxes, materials, tools, images] = await Promise.all([
    getAllShelves(),
    getAllBoxes(),
    getAllMaterials(),
    getAllTools(),
    getAllImages(), // { id, data }
  ]);

  const zip = new JSZip();

  // JSON ohne Bilder
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    shelves,
    boxes,
    materials,
    tools,
  };

  zip.file("data.json", JSON.stringify(payload, null, 2));

  // Bilder separat
  const imgFolder = zip.folder("images");

  for (const img of images) {
    imgFolder?.file(`${img.id}.txt`, img.data);
  }

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
    clearStore("images"),
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

  // Bilder importieren
  const imgFolder = zip.folder("images");
  if (imgFolder) {
    const files = Object.keys(imgFolder.files);

    for (const fileName of files) {
      const file = imgFolder.file(fileName);
      if (!file) continue;

      const content = await file.async("string");
      const id = fileName.replace(".txt", "");

      await saveImage(id, content);
    }
  }
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
