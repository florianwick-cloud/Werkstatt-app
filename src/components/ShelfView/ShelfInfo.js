import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pencil, Trash2 } from "lucide-react";
export default function ShelfInfo({ shelf, boxes, onDeleteBox, onEditBox, onOpenBox, }) {
    return (_jsxs("section", { style: { marginBottom: "1rem" }, children: [_jsx("h3", { children: "Kisten" }), boxes.length === 0 && (_jsx("p", { style: { opacity: 0.6 }, children: "Keine Kisten in diesem Regal" })), boxes.map((box) => (_jsxs("div", { style: {
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    marginTop: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    background: "#fff",
                }, children: [_jsxs("span", { style: { cursor: "pointer", fontWeight: 600 }, onClick: () => onOpenBox(box.id), children: ["\uD83D\uDCE6 ", box.name] }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [_jsx("button", { onClick: () => onEditBox(box), style: {
                                    background: "#ff7a00",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.3rem 0.6rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: _jsx(Pencil, { size: 18, strokeWidth: 2 }) }), _jsx("button", { onClick: () => onDeleteBox(box.id), style: {
                                    background: "#e53935",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.3rem 0.6rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: _jsx(Trash2, { size: 18, strokeWidth: 2 }) })] })] }, box.id)))] }));
}
