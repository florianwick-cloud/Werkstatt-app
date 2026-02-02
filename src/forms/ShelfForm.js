import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function ShelfForm({ initialShelf, onSave, onCancel }) {
    const [name, setName] = useState(initialShelf?.name ?? "");
    function handleSubmit(e) {
        e.preventDefault();
        const shelf = {
            id: initialShelf?.id ?? crypto.randomUUID(),
            name,
        };
        onSave(shelf);
    }
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50", children: _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-4 rounded-lg w-full max-w-sm", children: [_jsx("h3", { className: "text-lg font-semibold mb-3", children: initialShelf ? "Regal bearbeiten" : "Neues Regal" }), _jsx("input", { className: "w-full border p-2 rounded mb-3", placeholder: "Name des Regals", value: name, onChange: (e) => setName(e.target.value), required: true }), _jsx("button", { type: "submit", className: "w-full bg-orange-600 text-white p-2 rounded mb-2", children: initialShelf ? "Speichern" : "Hinzufügen" }), _jsx("button", { type: "button", onClick: onCancel, className: "w-full bg-gray-400 text-white p-2 rounded", children: "Abbrechen" })] }) }));
}
