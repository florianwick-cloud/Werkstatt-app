import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { searchAll } from "./utils/search";
import type { SearchResult } from "./utils/search";

import { openDB } from "./storage/db";

import WorkshopView from "./views/WorkshopView";
import ShelfRoute from "./routes/ShelfRoute";
import BoxRoute from "./routes/BoxRoute";

import type { Shelf, Box, Tool, Material } from "./types/models";
import type { DbAdd, DbPut, DbDelete } from "./types/db";

export default function App() {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    let isCancelled = false;

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
      const toolsRaw = await readAll<Tool>("tools");
      const materials = await readAll<Material>("materials");

      const imageStore = db.transaction("images", "readonly").objectStore("images");

      const toolsWithImages = await Promise.all(
        toolsRaw.map(
          (tool) =>
            new Promise<Tool>((resolve) => {
              if (!tool.imageId) {
                resolve({ ...tool, imageUrl: null });
                return;
              }

              const req = imageStore.get(tool.imageId);
              req.onsuccess = () => {
                const entry = req.result;

                if (entry && typeof entry.base64 === "string") {
                  resolve({
                    ...tool,
                    imageUrl: entry.base64,
                  });
                } else {
                  resolve({
                    ...tool,
                    imageUrl: null,
                  });
                }
              };

              req.onerror = () =>
                resolve({
                  ...tool,
                  imageUrl: null,
                });
            })
        )
      );

      if (isCancelled) return;

      setShelves(shelves);
      setBoxes(boxes);
      setTools(toolsWithImages);
      setMaterials(materials);

      setIsLoaded(true);
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, []);

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

  if (!isLoaded) return null;

  return (
    <Routes>
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
            onAddShelf={async (data) => {
              const shelf: Shelf = {
                id: crypto.randomUUID(),
                name: data.name,
              };
              await dbAdd("shelves", shelf);
              setShelves((p) => [...p, shelf]);
            }}
            onAddBox={async (data) => {
              const box: Box = {
                id: crypto.randomUUID(),
                name: data.name,
                shelfId: data.shelfId,
              };
              await dbAdd("boxes", box);
              setBoxes((p) => [...p, box]);
            }}
            onAddTool={async (toolInput) => {
              const id = crypto.randomUUID();

              // 1. Bild speichern
              let imageId: string | undefined = undefined;
              if (toolInput.imageBase64) {
                const db = await openDB();
                await db
                  .transaction("images", "readwrite")
                  .objectStore("images")
                  .put({ base64: toolInput.imageBase64 }, id);

                imageId = id;
              }

              // 2. Tool speichern
              const tool: Tool = {
                id,
                name: toolInput.name,
                description: toolInput.description ?? "",
                shelfId: toolInput.shelfId,
                boxId: toolInput.boxId,
                imageId,
                imageUrl: toolInput.imageBase64 ?? null,
              };

              await dbAdd("tools", tool);

              // 3. UI aktualisieren
              setTools((p) => [...p, tool]);
            }}
            onAddMaterial={async (data) => {
              const material: Material = {
                id: crypto.randomUUID(),
                ...data,
              };
              await dbAdd("materials", material);
              setMaterials((p) => [...p, material]);
            }}
            onUpdateShelf={async (shelf) => {
              setShelves((prev) =>
                prev.map((s) => {
                  if (s.id !== shelf.id) return s;
                  dbPut("shelves", shelf);
                  return shelf;
                })
              );
            }}
            onDeleteShelf={async (id) => {
              await dbDelete("shelves", id);
              setShelves((p) => p.filter((s) => s.id !== id));
            }}
          />
        }
      />

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
