import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pencil, Trash2 } from "lucide-react";
export default function MaterialItem({ material, onEdit, onDelete }) {
    return (_jsxs("div", { style: {
            padding: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            background: "#fff",
        }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: { fontWeight: 600 }, children: material.name }), _jsxs("div", { style: { fontSize: "0.85rem", opacity: 0.7 }, children: [material.quantity, " ", material.unit] })] }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [_jsx("button", { onClick: () => onEdit(material), style: {
                            background: "#ff7a00",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            padding: "0.3rem 0.6rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: _jsx(Pencil, { size: 18, strokeWidth: 2 }) }), _jsx("button", { onClick: () => onDelete(material.id), style: {
                            background: "#e53935",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            padding: "0.3rem 0.6rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }, children: _jsx(Trash2, { size: 18, strokeWidth: 2 }) })] })] }));
}
