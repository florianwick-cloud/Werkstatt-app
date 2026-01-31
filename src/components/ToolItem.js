import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Save } from "lucide-react";
export default function ToolItem({ tool, shelves, boxes, onEdit, onDelete, }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(tool.name);
    const [description, setDescription] = useState(tool.description || "");
    // 📍 Position
    const [location, setLocation] = useState(tool.boxId ? "box" : "shelf");
    const [selectedShelfId, setSelectedShelfId] = useState(tool.shelfId);
    const [selectedBoxId, setSelectedBoxId] = useState(tool.boxId ?? null);
    // Absicherung
    const safeShelves = shelves ?? [];
    const safeBoxes = boxes ?? [];
    const boxesForShelf = safeBoxes.filter((b) => b.shelfId === selectedShelfId);
    // 🔄 Wenn Regal gewechselt wird → Box zurücksetzen
    useEffect(() => {
        if (location === "box") {
            setSelectedBoxId((prev) => prev && boxesForShelf.some((b) => b.id === prev) ? prev : null);
        }
    }, [selectedShelfId, location]);
    function save() {
        if (!name.trim())
            return;
        onEdit({
            ...tool,
            name: name.trim(),
            description: description.trim() || undefined,
            shelfId: selectedShelfId,
            boxId: shelves && location === "box" ? selectedBoxId : null,
        });
        setIsEditing(false);
    }
    return (_jsxs("div", { style: {
            display: "flex",
            gap: "1rem",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "0.5rem",
            background: "#fff",
            alignItems: "flex-start",
        }, children: [tool.imageUrl && (_jsx("img", { src: tool.imageUrl, alt: tool.name, style: {
                    width: "48px",
                    height: "48px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                } })), _jsx("div", { style: { flex: 1 }, children: isEditing ? (_jsxs(_Fragment, { children: [_jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Werkzeugname", style: { width: "100%", marginBottom: "0.25rem" } }), _jsx("input", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Beschreibung (optional)", style: { width: "100%", marginBottom: "0.5rem" } }), safeShelves.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("div", { style: {
                                        display: "flex",
                                        gap: "1rem",
                                        marginBottom: "0.5rem",
                                    }, children: [_jsxs("label", { children: [_jsx("input", { type: "radio", checked: location === "shelf", onChange: () => setLocation("shelf") }), " ", "Regal"] }), _jsxs("label", { children: [_jsx("input", { type: "radio", checked: location === "box", onChange: () => setLocation("box") }), " ", "Kiste"] })] }), _jsx("select", { value: selectedShelfId, onChange: (e) => setSelectedShelfId(e.target.value), style: { width: "100%", marginBottom: "0.5rem" }, children: safeShelves.map((s) => (_jsx("option", { value: s.id, children: s.name }, s.id))) }), location === "box" && boxesForShelf.length > 0 && (_jsxs("select", { value: selectedBoxId ?? "", onChange: (e) => setSelectedBoxId(e.target.value), style: { width: "100%" }, children: [_jsx("option", { value: "", children: "Kiste ausw\u00E4hlen" }), boxesForShelf.map((b) => (_jsx("option", { value: b.id, children: b.name }, b.id)))] }))] }))] })) : (_jsxs(_Fragment, { children: [_jsx("div", { style: { fontWeight: 600 }, children: tool.name }), tool.description && (_jsx("div", { style: { fontSize: "0.85rem", color: "#666" }, children: tool.description }))] })) }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [isEditing ? (_jsx("button", { onClick: save, style: {
                            padding: "0.4rem 0.6rem",
                            borderRadius: "6px",
                            border: "none",
                            background: "#4caf50",
                            color: "white",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: _jsx(Save, { size: 18, strokeWidth: 2 }) })) : (_jsx("button", { onClick: () => setIsEditing(true), style: {
                            padding: "0.4rem 0.6rem",
                            borderRadius: "6px",
                            border: "none",
                            background: "#ff7a00",
                            color: "white",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: _jsx(Pencil, { size: 18, strokeWidth: 2 }) })), _jsx("button", { onClick: () => onDelete(tool.id), style: {
                            padding: "0.4rem 0.6rem",
                            borderRadius: "6px",
                            border: "none",
                            background: "#e53935",
                            color: "white",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: _jsx(Trash2, { size: 18, strokeWidth: 2 }) })] })] }));
}
