import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ShelfHeader from "./ShelfHeader";
import ShelfInfo from "./ShelfInfo";
import ShelfTools from "./ShelfTools"; // <-- WICHTIG: exakt wie Dateiname!
import ShelfMaterials from "./ShelfMaterials";
import BoxForm from "../../forms/BoxForm";
import ToolForm from "../../forms/ToolForm";
import MaterialForm from "../../forms/MaterialForm";
import QRLabel from "../qr/QRLabel";
export default function ShelfView({ shelf, shelves, boxes, tools, materials, onBack, onAddBox, onEditBox, onDeleteBox, onAddTool, onEditTool, onDeleteTool, onAddMaterial, onEditMaterial, onDeleteMaterial, }) {
    const [showBoxForm, setShowBoxForm] = useState(false);
    const [showToolForm, setShowToolForm] = useState(false);
    const [showMaterialForm, setShowMaterialForm] = useState(false);
    const [initialBox, setInitialBox] = useState(null);
    const [initialTool, setInitialTool] = useState(null);
    const [initialMaterial, setInitialMaterial] = useState(null);
    const [showQR, setShowQR] = useState(false);
    // 🔤 SORTIERUNG: alphabetisch nach name
    const shelfBoxes = boxes
        .filter((b) => b.shelfId === shelf.id)
        .sort((a, b) => a.name.localeCompare(b.name));
    const shelfTools = tools
        .filter((t) => t.shelfId === shelf.id && !t.boxId)
        .sort((a, b) => a.name.localeCompare(b.name));
    const shelfMaterials = materials
        .filter((m) => m.shelfId === shelf.id && !m.boxId)
        .sort((a, b) => a.name.localeCompare(b.name));
    function handleAddBox() {
        setInitialBox(null);
        setShowBoxForm(true);
    }
    function handleAddTool() {
        setInitialTool(null);
        setShowToolForm(true);
    }
    function handleAddMaterial() {
        setInitialMaterial(null);
        setShowMaterialForm(true);
    }
    return (_jsxs("div", { style: { padding: "1rem" }, children: [_jsx(ShelfHeader, { shelf: shelf, onBack: onBack, onAddBox: handleAddBox, onAddMaterial: handleAddMaterial, onAddTool: handleAddTool }), _jsx("div", { style: { marginBottom: "1rem" }, children: _jsx("button", { onClick: () => setShowQR(true), style: {
                        padding: "0.5rem 0.75rem",
                        background: "#ff7a00",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                    }, children: "QR\u2011Code f\u00FCr Regal" }) }), showQR && (_jsx("div", { style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.75)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2000,
                    padding: "1rem",
                }, children: _jsxs("div", { style: {
                        background: "white",
                        padding: "1rem",
                        borderRadius: "12px",
                        maxWidth: "90%",
                    }, children: [_jsx(QRLabel, { boxId: shelf.id, boxName: shelf.name, location: "Regal", size: "medium" }), _jsx("button", { onClick: () => setShowQR(false), style: {
                                marginTop: "1rem",
                                width: "100%",
                                padding: "0.75rem",
                                background: "#333",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: 600,
                                cursor: "pointer",
                            }, children: "Schlie\u00DFen" })] }) })), showBoxForm && (_jsx(BoxForm, { shelves: shelves, initialBox: initialBox ?? undefined, onSave: (box) => {
                    if (initialBox) {
                        onEditBox(box);
                    }
                    else {
                        onAddBox(box.name, box.shelfId);
                    }
                    setShowBoxForm(false);
                    setInitialBox(null);
                }, onCancel: () => {
                    setShowBoxForm(false);
                    setInitialBox(null);
                } })), showToolForm && (_jsx(ToolForm, { initialTool: initialTool ?? undefined, shelves: shelves, boxes: boxes, onSave: (tool) => {
                    if (initialTool)
                        onEditTool(tool);
                    else
                        onAddTool(tool);
                    setShowToolForm(false);
                    setInitialTool(null);
                }, onCancel: () => {
                    setShowToolForm(false);
                    setInitialTool(null);
                } })), showMaterialForm && (_jsx(MaterialForm, { initialMaterial: initialMaterial ?? undefined, shelves: shelves, boxes: boxes, onSave: (material) => {
                    if (initialMaterial)
                        onEditMaterial(material);
                    else
                        onAddMaterial(material);
                    setShowMaterialForm(false);
                    setInitialMaterial(null);
                }, onCancel: () => {
                    setShowMaterialForm(false);
                    setInitialMaterial(null);
                } })), _jsx(ShelfInfo, { shelf: shelf, boxes: shelfBoxes, onDeleteBox: onDeleteBox, onEditBox: (box) => {
                    setInitialBox(box);
                    setShowBoxForm(true);
                }, onOpenBox: (boxId) => {
                    window.location.href = `#/box/${boxId}`;
                } }), _jsx(ShelfTools, { tools: shelfTools, shelf: shelf, shelves: shelves, boxes: boxes, onAddTool: onAddTool, onEditTool: (tool) => {
                    setInitialTool(tool);
                    setShowToolForm(true);
                }, onDeleteTool: onDeleteTool }), _jsx(ShelfMaterials, { materials: shelfMaterials, shelf: shelf, shelves: shelves, boxes: boxes, onAddMaterial: onAddMaterial, onEditMaterial: (material) => {
                    setInitialMaterial(material);
                    setShowMaterialForm(true);
                }, onDeleteMaterial: onDeleteMaterial })] }));
}
