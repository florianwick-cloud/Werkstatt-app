import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AddMenu from "../AddMenu/AddMenu";
export default function ShelfHeader({ shelf, onBack, onAddBox, onAddMaterial, onAddTool, }) {
    return (_jsx("header", { className: "sticky top-0 z-20 bg-orange-500 text-white shadow-md", children: _jsxs("div", { className: "relative flex items-center justify-between px-4 py-2", children: [_jsx(AddMenu, { context: "shelf", onAddBox: onAddBox, onAddMaterial: onAddMaterial, onAddTool: onAddTool, className: "text-4xl" }), _jsx("h2", { className: "absolute left-1/2 -translate-x-1/2 text-xl font-semibold pointer-events-none", children: shelf.name }), _jsx("button", { onClick: onBack, className: "w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition", children: _jsx("span", { style: { fontSize: "2.2rem", lineHeight: "1" }, children: "\u2190" }) })] }) }));
}
