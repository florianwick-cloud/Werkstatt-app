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

  // Warten, bis Daten aus IndexedDB geladen sind
if (!boxes.length || !shelves.length) {
  return <div style={{ padding: "1rem" }}>Lade Daten…</div>;
}

const box = boxes.find((b) => b.id === boxId);
if (!box) {
  return <div style={{ padding: "1rem" }}>Kiste nicht gefunden</div>;
}

const shelf = shelves.find((s) => s.id === box.shelfId);
if (!shelf) {
  return <div style={{ padding: "1rem" }}>Regal nicht gefunden</div>;
}


  /* -------------------------
     WERKZEUGE
  ------------------------- */
  async function onAddTool(tool: Omit<Tool, "id">) {
    const newTool: Tool = {
      id: crypto.randomUUID(),
      ...tool,
      shelfId: box.shelfId,
      boxId: box.id,
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
  setTools(prev => prev.map(t => t.id === tool.id ? tool : t));
}
  /* -------------------------
     MATERIAL
  ------------------------- */
  async function onAddMaterial(material: Omit<Material, "id">) {
    const newMaterial: Material = {
      id: crypto.randomUUID(),
      ...material,
      shelfId: shelf.id,
      boxId: box.id,
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
  setMaterials(prev => prev.map(m => m.id === material.id ? material : m));
}
  return (
    <BoxView
      shelf={shelf}
      box={box}
      boxes={boxes}
      shelves={shelves}
      tools={tools.filter((t) => t.boxId === box.id)}
      materials={materials.filter((m) => m.boxId === box.id)}
      onBack={() => navigate(`/shelf/${box.shelfId}`)}
      onAddTool={onAddTool}
      onEditTool={onEditTool} 
      onDeleteTool={onDeleteTool}
      onAddMaterial={onAddMaterial}
      onEditMaterial={onEditMaterial} 
      onDeleteMaterial={onDeleteMaterial}
    />
  );
}
