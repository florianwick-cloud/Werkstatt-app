import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import QRDisplay from "./qr/QRDisplay";
export default function ShelfItem({ shelf, onOpen, onDelete }) {
    return (_jsxs("li", { style: {
            background: "white",
            borderRadius: "8px",
            padding: "0.8rem",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }, children: [_jsx("strong", { style: { cursor: onOpen ? "pointer" : "default", flex: 1 }, onClick: () => onOpen?.(shelf), children: shelf.name }), _jsx(QRDisplay, { value: `SHELF:${shelf.id}`, size: 64 }), onDelete && (_jsx("button", { className: "secondary", onClick: () => onDelete(shelf.id), children: "L\u00F6schen" }))] }));
}
