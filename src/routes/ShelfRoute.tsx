import { useNavigate, useParams } from "react-router-dom";
import type { Shelf, Box, Tool, Material } from "../types/models";
import type { DbAdd, DbPut, DbDelete } from "../types/db";
import ShelfView from "../components/ShelfView/ShelfView";

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

  // ============================
  // 1. Daten noch nicht geladen?
  // ============================
  if (!shelves.length || !boxes.length || !tools.length || !materials.length) {
    return <div style={{ padding: "1rem" }}>Lade Daten…</div>;
  }

  // ============================
  // 2. Shelf finden
  // ============================
  const shelf = shelves.find((s) => s.id === shelfId);
  if (!shelf) {
    return <div style={{ padding: "1rem" }}>Regal nicht gefunden</div>;
  }

  const safeShelf = shelf;

  // ============================
  // BOXEN
  // ============================
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

  // ============================
  // TOOLS
  // ============================
  async function onAddTool(toolInput: Omit<Tool, "id">) {
    const tool: Tool = {
      id: crypto.randomUUID(),
      name: toolInput.name,
      description: toolInput.description,
      shelfId: safeShelf.id,
      boxId: toolInput.boxId,
      imageBase64: toolInput.imageBase64,
    };

    await dbAdd("tools", tool);
    setTools((prev) => [...prev, tool]);
  }

  async function onEditTool(toolInput: Tool) {
    const updated: Tool = {
      ...toolInput,
      shelfId: safeShelf.id,
      boxId: toolInput.boxId ?? null,
      imageBase64: toolInput.imageBase64 ?? null,
    };

    await dbPut("tools", updated);

    setTools((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  async function onDeleteTool(id: string) {
    await dbDelete("tools", id);
    setTools((prev) => prev.filter((t) => t.id !== id));
  }

  // ============================
  // MATERIAL
  // ============================
  async function onAddMaterial(data: Omit<Material, "id">) {
    const newMaterial: Material = {
      id: crypto.randomUUID(),
      ...data,
      shelfId: safeShelf.id,
      boxId: data.boxId ?? null,
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

  // ============================
  // RENDER
  // ============================
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
