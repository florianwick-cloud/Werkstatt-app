import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import BoxView from "../components/BoxView/BoxView";
export default function BoxRoute({ boxes, shelves, tools, materials, setTools, setMaterials, dbAdd, dbPut, dbDelete, }) {
    const navigate = useNavigate();
    const { boxId } = useParams();
    // Warten auf Daten
    if (!boxes.length || !shelves.length) {
        return _jsx("div", { style: { padding: "1rem" }, children: "Lade Daten\u2026" });
    }
    // Box suchen
    const box = boxes.find((b) => b.id === boxId);
    if (!box) {
        return _jsx("div", { style: { padding: "1rem" }, children: "Kiste nicht gefunden" });
    }
    // Shelf suchen
    const shelf = shelves.find((s) => s.id === box.shelfId);
    if (!shelf) {
        return _jsx("div", { style: { padding: "1rem" }, children: "Regal nicht gefunden" });
    }
    // Ab hier sind box & shelf garantiert definiert
    const safeBox = box;
    const safeShelf = shelf;
    async function onAddTool(tool) {
        const newTool = {
            id: crypto.randomUUID(),
            ...tool,
            shelfId: safeBox.shelfId,
            boxId: safeBox.id,
        };
        await dbAdd("tools", newTool);
        setTools((prev) => [...prev, newTool]);
    }
    async function onDeleteTool(id) {
        await dbDelete("tools", id);
        setTools((prev) => prev.filter((t) => t.id !== id));
    }
    async function onEditTool(tool) {
        await dbPut("tools", tool);
        setTools((prev) => prev.map((t) => (t.id === tool.id ? tool : t)));
    }
    async function onAddMaterial(material) {
        const newMaterial = {
            id: crypto.randomUUID(),
            ...material,
            shelfId: safeShelf.id,
            boxId: safeBox.id,
        };
        await dbAdd("materials", newMaterial);
        setMaterials((prev) => [...prev, newMaterial]);
    }
    async function onDeleteMaterial(id) {
        await dbDelete("materials", id);
        setMaterials((prev) => prev.filter((m) => m.id !== id));
    }
    async function onEditMaterial(material) {
        await dbPut("materials", material);
        setMaterials((prev) => prev.map((m) => (m.id === material.id ? material : m)));
    }
    return (_jsx(BoxView, { shelf: safeShelf, box: safeBox, boxes: boxes, shelves: shelves, tools: tools.filter((t) => t.boxId === safeBox.id), materials: materials.filter((m) => m.boxId === safeBox.id), onBack: () => navigate(`/shelf/${safeBox.shelfId}`), onAddTool: onAddTool, onEditTool: onEditTool, onDeleteTool: onDeleteTool, onAddMaterial: onAddMaterial, onEditMaterial: onEditMaterial, onDeleteMaterial: onDeleteMaterial }));
}
