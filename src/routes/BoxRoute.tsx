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

  // Warten auf Daten
  if (!boxes.length || !shelves.length) {
    return <div style={{ padding: "1rem" }}>Lade Daten…</div>;
  }

  // Box suchen
  const box = boxes.find((b) => b.id === boxId);
  if (!box) {
    return <div style={{ padding: "1rem" }}>Kiste nicht gefunden</div>;
  }

  // Shelf suchen
  const shelf = shelves.find((s) => s.id === box.shelfId);
  if (!shelf) {
    return <div style={{ padding: "1rem" }}>Regal nicht gefunden</div>;
  }

  // Ab hier sind box & shelf garantiert definiert
  const safeBox = box;
  const safeShelf = shelf;

  async function onAddTool(tool: Omit<Tool, "id">) {
    const newTool: Tool = {
      id: crypto.randomUUID(),
      ...tool,
      shelfId: safeBox.shelfId,
      boxId: safeBox.id,
    };

    await dbAdd("tools", newTool);
    setTools((prev) => [...prev, newTool]);
  }

  async function onDeleteTool(id: string) {
    await dbDelete("tools", id);
    setTools((prev) => prev.filter((t) => t.id !== id));
  }

  async function onEditTool(tool: Tool) {
    await dbPut("tools", tool);
    setTools((prev) => prev.map((t) => (t.id === tool.id ? tool : t)));
  }

  async function onAddMaterial(material: Omit<Material, "id">) {
    const newMaterial: Material = {
      id: crypto.randomUUID(),
      ...material,
      shelfId: safeShelf.id,
      boxId: safeBox.id,
    };

    await dbAdd("materials", newMaterial);
    setMaterials((prev) => [...prev, newMaterial]);
  }

  async function onDeleteMaterial(id: string) {
    await dbDelete("materials", id);
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  async function onEditMaterial(material: Material) {
    await dbPut("materials", material);
    setMaterials((prev) =>
      prev.map((m) => (m.id === material.id ? material : m))
    );
  }

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
