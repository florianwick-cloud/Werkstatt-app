import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ShelfHeader from "./ShelfHeader";
import ShelfInfo from "./ShelfInfo";
import ShelfTools from "./ShelfTools";
import ShelfMaterials from "./ShelfMaterials";
import BoxForm from "../../forms/BoxForm";
import ToolForm from "../../forms/ToolForm";
import MaterialForm from "../../forms/MaterialForm";
import QRLabel from "../qr/QRLabel";
import QRScanner from "../qr/QRScanner";
export default function ShelfView({ shelf, shelves, boxes, tools, materials, onBack, onAddBox, onEditBox, onDeleteBox, onAddTool, onEditTool, onDeleteTool, onAddMaterial, onEditMaterial, onDeleteMaterial, }) {
    const [showBoxForm, setShowBoxForm] = useState(false);
    const [showToolForm, setShowToolForm] = useState(false);
    const [showMaterialForm, setShowMaterialForm] = useState(false);
    const [initialBox, setInitialBox] = useState(null);
    const [initialTool, setInitialTool] = useState(null);
    const [initialMaterial, setInitialMaterial] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const [showQRScanner, setShowQRScanner] = useState(false);
    // SORTIERUNG
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
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsx(ShelfHeader, { shelf: shelf, onBack: onBack, onAddBox: handleAddBox, onAddMaterial: handleAddMaterial, onAddTool: handleAddTool }), _jsxs("div", { className: "flex items-center gap-3 bg-orange-50 border-b border-orange-200", children: [_jsx("input", { type: "text", placeholder: "In diesem Regal suchen\u2026", className: "flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" }), _jsx("button", { onClick: () => setShowQRScanner(true), className: "w-11 h-11 flex items-center justify-center bg-orange-500 text-white rounded-md hover:bg-orange-600 transition", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 0h6v6h-6v-6z" }) }) }), _jsx("button", { onClick: () => setShowQR(true), className: "px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition text-sm font-semibold whitespace-nowrap", children: "Regal\u2011QR" })] }), showQR && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4", children: _jsxs("div", { className: "bg-white p-4 rounded-xl max-w-[90%]", children: [_jsx(QRLabel, { boxId: shelf.id, boxName: shelf.name, location: "Regal", size: "medium" }), _jsx("button", { onClick: () => setShowQR(false), className: "mt-4 w-full py-2 bg-gray-800 text-white rounded-md font-semibold", children: "Schlie\u00DFen" })] }) })), showQRScanner && (_jsx(QRScanner, { onScan: (value) => {
                    setShowQRScanner(false);
                    window.location.href = `#/shelf/${value}`;
                }, onClose: () => setShowQRScanner(false) })), showBoxForm && (_jsx(BoxForm, { shelves: shelves, initialBox: initialBox ?? undefined, onSave: (box) => {
                    if (initialBox)
                        onEditBox(box);
                    else
                        onAddBox(box.name, box.shelfId);
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
