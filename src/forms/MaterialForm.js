import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export default function MaterialForm({ initialMaterial, shelves, boxes, onSave, onCancel, }) {
    const [name, setName] = useState(initialMaterial?.name ?? "");
    const [quantity, setQuantity] = useState(initialMaterial?.quantity ?? 1);
    const [unit, setUnit] = useState(initialMaterial?.unit ?? "Stk");
    const [location, setLocation] = useState(initialMaterial?.boxId ? "box" : "shelf");
    const [selectedShelfId, setSelectedShelfId] = useState(initialMaterial?.shelfId ?? "");
    const [selectedBoxId, setSelectedBoxId] = useState(initialMaterial?.boxId ?? null);
    // Kisten des gewählten Regals
    const shelfBoxes = boxes.filter((b) => b.shelfId === selectedShelfId);
    // Wenn nur ein Regal existiert → automatisch auswählen
    useEffect(() => {
        if (!selectedShelfId && shelves.length === 1) {
            setSelectedShelfId(shelves[0].id);
        }
    }, [shelves, selectedShelfId]);
    // Box zurücksetzen wenn Ort = Regal
    useEffect(() => {
        if (location === "shelf") {
            setSelectedBoxId(null);
        }
        if (location === "box" && shelfBoxes.length === 1) {
            setSelectedBoxId(shelfBoxes[0].id);
        }
    }, [location, selectedShelfId, shelfBoxes]);
    function handleSubmit() {
        if (!name.trim())
            return;
        if (!selectedShelfId)
            return;
        if (location === "box" && !selectedBoxId)
            return;
        onSave({
            id: initialMaterial?.id ?? crypto.randomUUID(),
            name: name.trim(),
            quantity,
            unit,
            shelfId: selectedShelfId,
            boxId: location === "box" ? selectedBoxId : null,
        });
    }
    return (_jsxs("div", { style: {
            padding: "1rem",
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #ddd",
        }, children: [_jsx("h3", { style: { color: "#ff7a00", marginBottom: "0.75rem" }, children: initialMaterial ? "Material bearbeiten" : "Material hinzufügen" }), _jsxs("div", { style: { display: "flex", marginBottom: "0.75rem" }, children: [_jsx("button", { type: "button", onClick: () => setLocation("shelf"), style: {
                            flex: 1,
                            padding: "0.6rem",
                            background: location === "shelf" ? "#ff7a00" : "#eee",
                            color: location === "shelf" ? "white" : "#333",
                            border: "1px solid #ccc",
                            borderRadius: "6px 0 0 6px",
                            fontWeight: 600,
                        }, children: "\uD83E\uDDF1 Regal" }), _jsx("button", { type: "button", onClick: () => setLocation("box"), style: {
                            flex: 1,
                            padding: "0.6rem",
                            background: location === "box" ? "#ff7a00" : "#eee",
                            color: location === "box" ? "white" : "#333",
                            border: "1px solid #ccc",
                            borderRadius: "0 6px 6px 0",
                            fontWeight: 600,
                        }, children: "\uD83D\uDCE6 Kiste" })] }), _jsxs("select", { value: selectedShelfId, onChange: (e) => setSelectedShelfId(e.target.value), style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }, children: [_jsx("option", { value: "", children: "Regal w\u00E4hlen\u2026" }), shelves.map((s) => (_jsx("option", { value: s.id, children: s.name }, s.id)))] }), location === "box" && (_jsxs("select", { value: selectedBoxId ?? "", onChange: (e) => setSelectedBoxId(e.target.value || null), style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }, children: [_jsx("option", { value: "", children: "Kiste w\u00E4hlen\u2026" }), shelfBoxes.map((b) => (_jsx("option", { value: b.id, children: b.name }, b.id)))] })), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Materialname", style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" } }), _jsx("input", { type: "number", value: quantity, onChange: (e) => setQuantity(Number(e.target.value)), style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" } }), _jsx("input", { value: unit, onChange: (e) => setUnit(e.target.value), style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" } }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [_jsx("button", { onClick: handleSubmit, style: {
                            flex: 1,
                            background: "#ff7a00",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            padding: "0.6rem",
                            fontWeight: 600,
                        }, children: "Speichern" }), _jsx("button", { onClick: onCancel, style: {
                            flex: 1,
                            background: "#ccc",
                            border: "none",
                            borderRadius: "6px",
                            padding: "0.6rem",
                        }, children: "Abbrechen" })] })] }));
}
