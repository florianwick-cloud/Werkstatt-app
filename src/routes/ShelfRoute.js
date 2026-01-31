import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import ShelfView from "../components/ShelfView/ShelfView";
export default function ShelfRoute({ shelves, boxes, tools, materials, setBoxes, setTools, setMaterials, dbAdd, dbPut, dbDelete, }) {
    const navigate = useNavigate();
    const { shelfId } = useParams();
    const shelf = shelves.find((s) => s.id === shelfId);
    if (!shelf)
        return null;
    /* -------------------------
       BOXEN
    ------------------------- */
    async function onAddBox(name, shelfId) {
        const box = { id: crypto.randomUUID(), name, shelfId };
        await dbAdd("boxes", box);
        setBoxes((prev) => [...prev, box]);
    }
    async function onEditBox(updatedBox) {
        await dbPut("boxes", updatedBox);
        setBoxes((prev) => prev.map((b) => (b.id === updatedBox.id ? updatedBox : b)));
    }
    async function onDeleteBox(id) {
        await dbDelete("boxes", id);
        setBoxes((prev) => prev.filter((b) => b.id !== id));
    }
    /* -------------------------
       WERKZEUGE
    ------------------------- */
    async function onAddTool(tool) {
        const newTool = { id: crypto.randomUUID(), ...tool };
        await dbAdd("tools", newTool);
        setTools((prev) => [...prev, newTool]);
    }
    async function onEditTool(tool) {
        await dbPut("tools", tool);
        setTools((prev) => prev.map((t) => (t.id === tool.id ? tool : t)));
    }
    async function onDeleteTool(id) {
        await dbDelete("tools", id);
        setTools((prev) => prev.filter((t) => t.id !== id));
    }
    /* -------------------------
       MATERIAL
    ------------------------- */
    async function onAddMaterial(material) {
        const newMaterial = { id: crypto.randomUUID(), ...material };
        await dbAdd("materials", newMaterial);
        setMaterials((prev) => [...prev, newMaterial]);
    }
    async function onEditMaterial(material) {
        await dbPut("materials", material);
        setMaterials((prev) => prev.map((m) => (m.id === material.id ? material : m)));
    }
    async function onDeleteMaterial(id) {
        await dbDelete("materials", id);
        setMaterials((prev) => prev.filter((m) => m.id !== id));
    }
    return (_jsx(ShelfView, { shelf: shelf, shelves: shelves, boxes: boxes, tools: tools, materials: materials, onBack: () => navigate("/"), onAddBox: onAddBox, onEditBox: onEditBox, onDeleteBox: onDeleteBox, onAddTool: onAddTool, onEditTool: onEditTool, onDeleteTool: onDeleteTool, onAddMaterial: onAddMaterial, onEditMaterial: onEditMaterial, onDeleteMaterial: onDeleteMaterial }));
}
