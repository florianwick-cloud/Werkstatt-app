import { useNavigate, useParams } from "react-router-dom";
import type { Shelf, Box, Tool, Material } from "../types/models";
import type { DbAdd, DbPut, DbDelete } from "../types/db";
import ShelfView from "../components/ShelfView/ShelfView";
import { openDB } from "../storage/db";

type ShelfRouteProps = {
  shelves: Shelf[];
  boxes: Box[];
  tools: Tool[];
  materials: Material[];

  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>;
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;

  dbAdd: DbAdd;
  dbPut: DbPut;
  dbDelete: DbDelete;
};

export default function ShelfRoute({
  shelves,
  boxes,
  tools,
  materials,
  setBoxes,
  setTools,
  setMaterials,
  dbAdd,
  dbPut,
  dbDelete,
}: ShelfRouteProps) {
  const navigate = useNavigate();
  const { shelfId } = useParams<{ shelfId: string }>();

  const shelf = shelves.find((s) => s.id === shelfId);
  if (!shelf) return null;

  const safeShelf = shelf;

  /* =========================
     BOXEN
     ========================= */
  async function onAddBox(name: string, shelfId: string) {
    const box: Box = {
      id: crypto.randomUUID(),
      name,
      shelfId,
    };

    await dbAdd("boxes", box);
    setBoxes((prev) => [...prev, box]);
  }

  async function onEditBox(updatedBox: Box) {
    await dbPut("boxes", updatedBox);
    setBoxes((prev) =>
      prev.map((b) => (b.id === updatedBox.id ? updatedBox : b))
    );
  }

  async function onDeleteBox(id: string) {
    await dbDelete("boxes", id);
    setBoxes((prev) => prev.filter((b) => b.id !== id));
  }

  /* =========================
     WERKZEUGE (NEU: MIT BILD)
     ========================= */

  async function onAddTool(toolInput: any, imageBlob: Blob | null) {
    const id = crypto.randomUUID();

    const tool: Tool = {
      id,
      name: toolInput.name,
      description: toolInput.description ?? "",
      shelfId: safeShelf.id,
      boxId: null,
      imageId: imageBlob ? id : undefined,
    };

    await dbAdd("tools", tool);

    if (imageBlob) {
      const db = await openDB();
      db.transaction("images", "readwrite")
        .objectStore("images")
        .put(imageBlob, id);
    }

    setTools((prev) => [
      ...prev,
      {
        ...tool,
        imageUrl: imageBlob ? URL.createObjectURL(imageBlob) : undefined,
      },
    ]);
  }

  async function onEditTool(toolInput: any, imageBlob: Blob | null) {
    const oldTool = tools.find((t) => t.id === toolInput.id);
    if (!oldTool) return;

    const updated: Tool = {
      ...oldTool,
      name: toolInput.name,
      description: toolInput.description ?? "",
      shelfId: safeShelf.id,
      boxId: null,
      imageId: oldTool.imageId ?? (imageBlob ? oldTool.id : undefined),
    };

    const db = await openDB();

    // Bild ersetzen
    if (imageBlob) {
      db.transaction("images", "readwrite")
        .objectStore("images")
        .put(imageBlob, updated.id);
    }

    await dbPut("tools", updated);

    setTools((prev) =>
      prev.map((t) =>
        t.id === updated.id
          ? {
              ...updated,
              imageUrl: imageBlob
                ? URL.createObjectURL(imageBlob)
                : t.imageUrl,
            }
          : t
      )
    );
  }

  async function onDeleteTool(id: string) {
    const tool = tools.find((t) => t.id === id);

    if (tool?.imageId) {
      const db = await openDB();
      db.transaction("images", "readwrite")
        .objectStore("images")
        .delete(tool.imageId);
    }

    await dbDelete("tools", id);
    setTools((prev) => prev.filter((t) => t.id !== id));
  }

  /* =========================
     MATERIAL
     ========================= */
  async function onAddMaterial(data: Omit<Material, "id">) {
    const newMaterial: Material = {
      id: crypto.randomUUID(),
      ...data,
      shelfId: safeShelf.id,
      boxId: null,
    };

    await dbAdd("materials", newMaterial);
    setMaterials((prev) => [...prev, newMaterial]);
  }

  async function onEditMaterial(material: Material) {
    const updated: Material = {
      ...material,
      shelfId: safeShelf.id,
      boxId: material.boxId ?? null,
    };

    await dbPut("materials", updated);
    setMaterials((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  }

  async function onDeleteMaterial(id: string) {
    await dbDelete("materials", id);
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  /* =========================
     RENDER
     ========================= */
  return (
    <ShelfView
      shelf={safeShelf}
      shelves={shelves}
      boxes={boxes.filter((b) => b.shelfId === safeShelf.id)}
      tools={tools.filter((t) => t.shelfId === safeShelf.id)}
      materials={materials.filter((m) => m.shelfId === safeShelf.id)}
      onBack={() => navigate("/")}

      onAddBox={onAddBox}
      onEditBox={onEditBox}
      onDeleteBox={onDeleteBox}

      onAddTool={onAddTool}
      onEditTool={onEditTool}
      onDeleteTool={onDeleteTool}

      onAddMaterial={onAddMaterial}
      onEditMaterial={onEditMaterial}
      onDeleteMaterial={onDeleteMaterial}
    />
  );
}
