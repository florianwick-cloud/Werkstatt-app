import { useNavigate, useParams } from "react-router-dom";
import type { Shelf, Box, Tool, Material } from "../types/models";
import type { DbAdd, DbPut, DbDelete } from "../types/db";
import BoxView from "../components/BoxView/BoxView";

type BoxRouteProps = {
  boxes: Box[];
  shelves: Shelf[];
  tools: Tool[];
  materials: Material[];

  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;

  dbAdd: DbAdd;
  dbPut: DbPut;
  dbDelete: DbDelete;
};

export default function BoxRoute({
  boxes,
  shelves,
  tools,
  materials,
  setTools,
  setMaterials,
  dbAdd,
  dbPut,
  dbDelete,
}: BoxRouteProps) {
  const navigate = useNavigate();
  const { boxId } = useParams<{ boxId: string }>();

  /* =========================
     DATEN PRÜFEN
     ========================= */
  if (!boxes.length || !shelves.length) {
    return <div style={{ padding: "1rem" }}>Lade Daten…</div>;
  }

  const box = boxes.find((b) => b.id === boxId);
  if (!box) return <div style={{ padding: "1rem" }}>Kiste nicht gefunden</div>;

  const shelf = shelves.find((s) => s.id === box.shelfId);
  if (!shelf) return <div style={{ padding: "1rem" }}>Regal nicht gefunden</div>;

  const safeBox = box;
  const safeShelf = shelf;

  /* =========================
     TOOL: ADD
     ========================= */
  async function onAddTool(data: Omit<Tool, "id">) {
    const newTool: Tool = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description ?? "",
      imageUrl: data.imageUrl ?? null,   // ⭐ WICHTIG: Bild übernehmen
      shelfId: safeShelf.id,
      boxId: safeBox.id,
    };

    await dbAdd("tools", newTool);
    setTools((prev) => [...prev, newTool]);
  }

  /* =========================
     TOOL: DELETE
     ========================= */
  async function onDeleteTool(id: string) {
    await dbDelete("tools", id);
    setTools((prev) => prev.filter((t) => t.id !== id));
  }

  /* =========================
     TOOL: EDIT
     ========================= */
  async function onEditTool(tool: Tool) {
    const updated: Tool = {
      ...tool,
      shelfId: safeShelf.id,
      boxId: safeBox.id,
      imageUrl: tool.imageUrl ?? null,   // ⭐ WICHTIG: Bild nicht verlieren
    };

    await dbPut("tools", updated);
    setTools((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  /* =========================
     MATERIAL: ADD
     ========================= */
  async function onAddMaterial(data: Omit<Material, "id">) {
    const newMaterial: Material = {
      id: crypto.randomUUID(),
      ...data,
      shelfId: safeShelf.id,
      boxId: safeBox.id,
    };

    await dbAdd("materials", newMaterial);
    setMaterials((prev) => [...prev, newMaterial]);
  }

  /* =========================
     MATERIAL: DELETE
     ========================= */
  async function onDeleteMaterial(id: string) {
    await dbDelete("materials", id);
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  /* =========================
     MATERIAL: EDIT
     ========================= */
  async function onEditMaterial(material: Material) {
    const updated: Material = {
      ...material,
      shelfId: safeShelf.id,
      boxId: safeBox.id,
    };

    await dbPut("materials", updated);
    setMaterials((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  }

  /* =========================
     RENDER
     ========================= */
  return (
    <BoxView
      shelf={safeShelf}
      box={safeBox}
      boxes={boxes}
      shelves={shelves}
      tools={tools.filter((t) => t.boxId === safeBox.id)}
      materials={materials.filter((m) => m.boxId === safeBox.id)}
      onBack={() => navigate(`/shelf/${safeBox.shelfId}`)}
      onAddTool={onAddTool}
      onEditTool={onEditTool}
      onDeleteTool={onDeleteTool}
      onAddMaterial={onAddMaterial}
      onEditMaterial={onEditMaterial}
      onDeleteMaterial={onDeleteMaterial}
    />
  );
}
