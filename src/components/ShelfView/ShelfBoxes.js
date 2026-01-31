import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import QRCode from "react-qr-code";
export default function ShelfBoxes({ boxes, onOpenBox, onDeleteBox, onAddBox }) {
    return (_jsxs("section", { children: [_jsx("h3", { children: "Kisten" }), _jsx("button", { onClick: onAddBox, children: "+ Kiste hinzuf\u00FCgen" }), boxes.map((box) => (_jsxs("div", { onClick: () => onOpenBox(box.id), style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                    background: "#fff",
                }, children: [_jsx("strong", { children: box.name }), _jsxs("div", { style: { display: "flex", gap: "0.75rem" }, onClick: (e) => e.stopPropagation(), children: [_jsx(QRCode, { value: box.id, size: 48 }), _jsx("button", { onClick: () => onDeleteBox(box.id), children: "\uD83D\uDDD1" })] })] }, box.id)))] }));
}
