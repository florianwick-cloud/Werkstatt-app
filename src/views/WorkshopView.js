import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRScanner from "../components/qr/QRScanner";
import GlobalSearch from "../components/GlobalSearch";
import WorkshopHeader from "../components/WorkshopHeader";
import { QrCode, Pencil, Trash2 } from "lucide-react";
export default function WorkshopView({ shelves, boxes, tools, materials, searchQuery, onSearchChange, searchResults, onAddShelf, onAddBox, onAddTool, onAddMaterial, onUpdateShelf, onDeleteShelf, }) {
    const navigate = useNavigate();
    const [showScanner, setShowScanner] = useState(false);
    function handleScan(value) {
        setShowScanner(false);
        navigate(`/shelf/${value}`);
    }
    function handleAddShelf() {
        const name = prompt("Name des Regals:");
        if (name)
            onAddShelf(name);
    }
    function handleAddBox() {
        const name = prompt("Name der Kiste:");
        if (name)
            onAddBox(name);
    }
    function handleAddTool() {
        const name = prompt("Name des Werkzeugs:");
        if (name)
            onAddTool(name);
    }
    function handleAddMaterial() {
        const name = prompt("Name des Materials:");
        if (name)
            onAddMaterial(name);
    }
    function handleEditShelf(shelf) {
        const name = prompt("Regal umbenennen:", shelf.name);
        if (name)
            onUpdateShelf(shelf.id, name);
    }
    const sortedShelves = [...shelves].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsx(WorkshopHeader, { onAddShelf: handleAddShelf, onAddBox: handleAddBox, onAddTool: handleAddTool, onAddMaterial: handleAddMaterial }), _jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-orange-50 border-b border-orange-200", children: [_jsx("input", { value: searchQuery, onChange: (e) => onSearchChange(e.target.value), placeholder: "Suchen\u2026", className: "flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" }), _jsx("button", { onClick: () => setShowScanner(true), className: "w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-md hover:bg-orange-600 transition", children: _jsx(QrCode, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "p-4", children: [_jsx(GlobalSearch, { shelves: shelves, boxes: boxes, tools: tools, materials: materials, query: searchQuery }), sortedShelves.map((shelf) => (_jsxs("div", { onClick: () => navigate(`/shelf/${shelf.id}`), className: "flex items-center p-3 border border-gray-300 rounded-lg mb-2 bg-white cursor-pointer hover:bg-gray-50 transition", children: [_jsx("div", { className: "flex-1 font-semibold", children: shelf.name }), _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    handleEditShelf(shelf);
                                }, className: "mr-2 bg-orange-500 text-white rounded-md p-2", children: _jsx(Pencil, { size: 18 }) }), _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    onDeleteShelf(shelf.id);
                                }, className: "bg-red-500 text-white rounded-md p-2", children: _jsx(Trash2, { size: 18 }) })] }, shelf.id))), showScanner && (_jsx(QRScanner, { onScan: handleScan, onClose: () => setShowScanner(false) }))] })] }));
}
