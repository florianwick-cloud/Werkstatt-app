import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function BoxForm({ shelves, initialBox, onSave, onCancel }) {
    const [name, setName] = useState(initialBox?.name ?? "");
    const [shelfId, setShelfId] = useState(initialBox?.shelfId ?? shelves[0]?.id);
    function handleSubmit(e) {
        e.preventDefault();
        const box = {
            id: initialBox?.id ?? crypto.randomUUID(),
            name,
            shelfId,
        };
        onSave(box);
    }
    return (_jsx("div", { style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
        }, children: _jsxs("form", { onSubmit: handleSubmit, style: {
                background: "white",
                padding: "1rem",
                borderRadius: "8px",
                width: "90%",
                maxWidth: "400px",
            }, children: [_jsx("h3", { children: initialBox ? "Kiste bearbeiten" : "Neue Kiste" }), _jsx("label", { children: "Name der Kiste" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, style: {
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                    } }), _jsx("label", { children: "Regal" }), _jsx("select", { value: shelfId, onChange: (e) => setShelfId(e.target.value), style: {
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                    }, children: shelves.map((shelf) => (_jsx("option", { value: shelf.id, children: shelf.name }, shelf.id))) }), _jsx("button", { type: "submit", style: {
                        width: "100%",
                        padding: "0.75rem",
                        background: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                        marginBottom: "0.5rem",
                    }, children: initialBox ? "Speichern" : "Hinzufügen" }), _jsx("button", { type: "button", onClick: onCancel, style: {
                        width: "100%",
                        padding: "0.75rem",
                        background: "#aaa",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }, children: "Abbrechen" })] }) }));
}
