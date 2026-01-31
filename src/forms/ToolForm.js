import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export default function ToolForm({ initialTool, shelves, boxes, onSave, onCancel, }) {
    const [name, setName] = useState(initialTool?.name ?? "");
    const [description, setDescription] = useState(initialTool?.description ?? "");
    const [location, setLocation] = useState(initialTool?.boxId ? "box" : "shelf");
    const [selectedShelfId, setSelectedShelfId] = useState(initialTool?.shelfId ?? "");
    const [selectedBoxId, setSelectedBoxId] = useState(initialTool?.boxId ?? null);
    // ⭐ Bild-URL
    const [imageUrl, setImageUrl] = useState(initialTool?.imageUrl ?? null);
    function handleImageUpload(e) {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    }
    const shelfBoxes = boxes.filter((b) => b.shelfId === selectedShelfId);
    useEffect(() => {
        if (!selectedShelfId && shelves.length === 1) {
            setSelectedShelfId(shelves[0].id);
        }
    }, [shelves, selectedShelfId]);
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
            id: initialTool?.id ?? crypto.randomUUID(),
            name: name.trim(),
            description: description.trim(),
            shelfId: selectedShelfId,
            boxId: location === "box" ? selectedBoxId : null,
            // ⭐ FIX: null → undefined
            imageUrl: imageUrl ?? undefined,
        });
    }
    return (_jsxs("div", { style: {
            padding: "1rem",
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #ddd",
        }, children: [_jsx("h3", { style: { color: "#ff7a00", marginBottom: "0.75rem" }, children: initialTool ? "Werkzeug bearbeiten" : "Werkzeug hinzufügen" }), _jsxs("div", { style: { display: "flex", marginBottom: "0.75rem" }, children: [_jsx("button", { type: "button", onClick: () => setLocation("shelf"), style: {
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
                        }, children: "\uD83D\uDCE6 Kiste" })] }), _jsxs("select", { value: selectedShelfId, onChange: (e) => setSelectedShelfId(e.target.value), style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }, children: [_jsx("option", { value: "", children: "Regal w\u00E4hlen\u2026" }), shelves.map((s) => (_jsx("option", { value: s.id, children: s.name }, s.id)))] }), location === "box" && (_jsxs("select", { value: selectedBoxId ?? "", onChange: (e) => setSelectedBoxId(e.target.value || null), style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }, children: [_jsx("option", { value: "", children: "Kiste w\u00E4hlen\u2026" }), shelfBoxes.map((b) => (_jsx("option", { value: b.id, children: b.name }, b.id)))] })), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Werkzeugname", style: { width: "100%", padding: "0.5rem", marginBottom: "0.75rem" } }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Beschreibung (optional)", style: {
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.75rem",
                    minHeight: "60px",
                } }), _jsxs("div", { style: { marginBottom: "0.75rem" }, children: [_jsx("label", { style: {
                            display: "block",
                            marginBottom: "0.25rem",
                            fontWeight: 600,
                        }, children: "Foto" }), _jsxs("label", { style: {
                            display: "inline-block",
                            cursor: "pointer",
                            border: "1px solid #ccc",
                            padding: "0.25rem",
                            borderRadius: "6px",
                            background: "#fafafa",
                        }, children: [_jsx("img", { src: imageUrl ?? "/placeholder.png", alt: "Werkzeugbild", style: {
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                } }), _jsx("input", { type: "file", accept: "image/*", capture: "environment", onChange: handleImageUpload, style: { display: "none" } })] })] }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [_jsx("button", { onClick: handleSubmit, style: {
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
