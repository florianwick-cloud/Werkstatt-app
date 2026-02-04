import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/* 🔍 Global Search */
import { searchAll } from "./utils/search";
import type { SearchResult } from "./utils/search";

/* 💾 IndexedDB */
import { openDB } from "./storage/db";

import WorkshopView from "./views/WorkshopView";
import ShelfRoute from "./routes/ShelfRoute";
import BoxRoute from "./routes/BoxRoute";

import type { Shelf, Box, Tool, Material } from "./types/models";
import type { DbAdd, DbPut, DbDelete } from "./types/db";

/* ============================================================
   APP ROOT
   ============================================================ */

export default function App() {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  /* 🔍 Suche */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  /* ============================================================
     LOAD FROM INDEXEDDB (inkl. Bilder)
     ============================================================ */
  useEffect(() => {
    async function load() {
      const db = await openDB();

      const readAll = <T,>(store: string): Promise<T[]> =>
        new Promise((resolve, reject) => {
          const tx = db.transaction(store, "readonly");
          const req = tx.objectStore(store).getAll();
          req.onsuccess = () => resolve(req.result as T[]);
          req.onerror = () => reject();
        });

      const shelves = await readAll<Shelf>("shelves");
      const boxes = await readAll<Box>("boxes");
      const tools = await readAll<Tool>("tools");
      const materials = await readAll<Material>("materials");

      /* Bilder laden */
      const imageStore = db.transaction("images", "readonly").objectStore("images");

      const toolsWithImages = await Promise.all(
        tools.map(async (tool) => {
          if (!tool.imageId) return tool;

          return new Promise<Tool>((resolve) => {
            const req = imageStore.get(tool.imageId);
            req.onsuccess = () => {
              const blob = req.result as Blob | undefined;
              resolve({
                ...tool,
                imageUrl: blob ? URL.createObjectURL(blob) : undefined,
              });
            };
            req.onerror = () => resolve(tool);
          });
        })
      );

      setShelves(shelves);
      setBoxes(boxes);
      setTools(toolsWithImages);
      setMaterials(materials);

      setIsLoaded(true);
    }

    load();
  }, []);

  /* ============================================================
     GLOBALE SUCHE
     ============================================================ */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchResults(
      searchAll({
        query: searchQuery,
        shelves,
        boxes,
        tools,
        materials,
      })
    );
  }, [searchQuery, shelves, boxes, tools, materials]);

  /* ============================================================
     HELPERS
     ============================================================ */
  async function dbAdd(store: string, value: any) {
    const db = await openDB();
    db.transaction(store, "readwrite").objectStore(store).add(value);
  }

  async function dbPut(store: string, value: any) {
    const db = await openDB();
    db.transaction(store, "readwrite").objectStore(store).put(value);
  }

  async function dbDelete(store: string, id: string) {
    const db = await openDB();
    db.transaction(store, "readwrite").objectStore(store).delete(id);
  }

  /* ============================================================
     WICHTIG: Keine Routen bevor Daten geladen sind
     ============================================================ */
  if (!isLoaded) return null;

  return (
    <Routes>
      {/* ============================================================
          WORKSHOP ROOT
         ============================================================ */}
      <Route
        path="/"
        element={
          <WorkshopView
            shelves={shelves}
            boxes={boxes}
            tools={tools}
            materials={materials}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchResults={searchResults}
            
            /* ➕ REGAL */
            onAddShelf={async (data) => {
              const shelf: Shelf = {
                id: crypto.randomUUID(),
                name: data.name,
              };
              await dbAdd("shelves", shelf);
              setShelves((p) => [...p, shelf]);
            }}

            /* ➕ KISTE */
            onAddBox={async (data) => {
              const box: Box = {
                id: crypto.randomUUID(),
                name: data.name,
                shelfId: data.shelfId,
              };
              await dbAdd("boxes", box);
              setBoxes((p) => [...p, box]);
            }}

            /* ➕ WERKZEUG */
            onAddTool={async (data, imageBlob) => {
              const id = crypto.randomUUID();

              const tool: Tool = {
                id,
                name: data.name,
                description: data.description,
                shelfId: data.shelfId,
                boxId: data.boxId,
                imageId: imageBlob ? id : undefined,
              };

              await dbAdd("tools", tool);

              if (imageBlob) {
                const db = await openDB();
                db.transaction("images", "readwrite")
                  .objectStore("images")
                  .put(imageBlob, id);
              }

              setTools((p) => [
                ...p,
                {
                  ...tool,
                  imageUrl: imageBlob ? URL.createObjectURL(imageBlob) : undefined,
                },
              ]);
            }}

            /* ➕ MATERIAL */
            onAddMaterial={async (data) => {
              const material: Material = {
                id: crypto.randomUUID(),
                ...data,
              };
              await dbAdd("materials", material);
              setMaterials((p) => [...p, material]);
            }}

            /* ✏️ REGAL UPDATE */
            onUpdateShelf={async (shelf) => {
              setShelves((prev) =>
                prev.map((s) => {
                  if (s.id !== shelf.id) return s;
                  dbPut("shelves", shelf);
                  return shelf;
                })
              );
            }}

            /* 🗑 REGAL DELETE */
            onDeleteShelf={async (id) => {
              await dbDelete("shelves", id);
              setShelves((p) => p.filter((s) => s.id !== id));
            }}
          />
        }
      />

      {/* ============================================================
          SHELF ROUTE
         ============================================================ */}
      <Route
        path="/shelf/:shelfId"
        element={
          <ShelfRoute
            shelves={shelves}
            boxes={boxes}
            tools={tools}
            materials={materials}
            setBoxes={setBoxes}
            setTools={setTools}
            setMaterials={setMaterials}
            dbAdd={dbAdd}
            dbPut={dbPut}
            dbDelete={dbDelete}
          />
        }
      />

      {/* ============================================================
          BOX ROUTE
         ============================================================ */}
      <Route
        path="/box/:boxId"
        element={
          <BoxRoute
            boxes={boxes}
            tools={tools}
            shelves={shelves}
            materials={materials}
            setTools={setTools}
            setMaterials={setMaterials}
            dbAdd={dbAdd}
            dbPut={dbPut}
            dbDelete={dbDelete}
          />
        }
      />
    </Routes>
  );
}
