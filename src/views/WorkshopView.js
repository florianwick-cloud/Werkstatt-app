import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRScanner from "../components/qr/QRScanner";
import GlobalSearch from "../components/GlobalSearch";
import WorkshopHeader from "../components/WorkshopHeader";
import { Pencil, Trash2 } from "lucide-react";
export default function WorkshopView({ shelves, boxes, tools, materials, searchQuery, onSearchChange, searchResults, onAddShelf, onUpdateShelf, onDeleteShelf, }) {
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
    function handleEditShelf(shelf) {
        const name = prompt("Regal umbenennen:", shelf.name);
        if (name)
            onUpdateShelf(shelf.id, name);
    }
    const sortedShelves = [...shelves].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsx(WorkshopHeader, { searchQuery: searchQuery, onSearchChange: onSearchChange, onAddShelf: handleAddShelf, onAddBox: () => alert("Kiste hinzufügen kommt später"), onAddTool: () => alert("Werkzeug hinzufügen kommt später"), onAddMaterial: () => alert("Material hinzufügen kommt später"), onOpenQR: () => setShowScanner(true) }), _jsxs("div", { style: { padding: "1rem" }, children: [_jsx(GlobalSearch, { shelves: shelves, boxes: boxes, tools: tools, materials: materials, query: searchQuery }), sortedShelves.map((shelf) => (_jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            padding: "0.75rem",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            marginBottom: "0.5rem",
                            background: "#fff",
                        }, children: [_jsx("div", { style: { flex: 1, fontWeight: 600, cursor: "pointer" }, onClick: () => navigate(`/shelf/${shelf.id}`), children: shelf.name }), _jsx("button", { onClick: () => handleEditShelf(shelf), style: {
                                    marginRight: "0.5rem",
                                    background: "#ff7a00",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "6px",
                                    padding: "0.4rem 0.6rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: _jsx(Pencil, { size: 18, strokeWidth: 2 }) }), _jsx("button", { onClick: () => onDeleteShelf(shelf.id), style: {
                                    background: "#e53935",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "6px",
                                    padding: "0.4rem 0.6rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: _jsx(Trash2, { size: 18, strokeWidth: 2 }) })] }, shelf.id))), showScanner && (_jsx(QRScanner, { onScan: handleScan, onClose: () => setShowScanner(false) }))] })] }));
}
