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

  const shelf = shelves.find((s) => s.id === shelfId);
  if (!shelf) return null;

  /* -------------------------
     BOXEN
  ------------------------- */
  async function onAddBox(name: string, shelfId: string) {
    const box: Box = { id: crypto.randomUUID(), name, shelfId };
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

  /* -------------------------
     WERKZEUGE
  ------------------------- */
  async function onAddTool(tool: Omit<Tool, "id">) {
    const newTool: Tool = { id: crypto.randomUUID(), ...tool };
    await dbAdd("tools", newTool);
    setTools((prev) => [...prev, newTool]);
  }

  async function onEditTool(tool: Tool) {
    await dbPut("tools", tool);
    setTools((prev) => prev.map((t) => (t.id === tool.id ? tool : t)));
  }

  async function onDeleteTool(id: string) {
    await dbDelete("tools", id);
    setTools((prev) => prev.filter((t) => t.id !== id));
  }

  /* -------------------------
     MATERIAL
  ------------------------- */
  async function onAddMaterial(material: Omit<Material, "id">) {
    const newMaterial: Material = { id: crypto.randomUUID(), ...material };
    await dbAdd("materials", newMaterial);
    setMaterials((prev) => [...prev, newMaterial]);
  }

  async function onEditMaterial(material: Material) {
    await dbPut("materials", material);
    setMaterials((prev) =>
      prev.map((m) => (m.id === material.id ? material : m))
    );
  }

  async function onDeleteMaterial(id: string) {
    await dbDelete("materials", id);
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <ShelfView
      shelf={shelf}
      shelves={shelves}
      boxes={boxes}
      tools={tools}
      materials={materials}
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
