import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AddMenu from "../AddMenu/AddMenu";
export default function BoxHeader({ box, onBack, onAddTool, onAddMaterial, }) {
    if (!box) {
        return (_jsx("header", { className: "sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3", children: _jsx("div", { className: "text-gray-500", children: "Lade Kiste\u2026" }) }));
    }
    return (_jsx("header", { className: "sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200", children: _jsxs("div", { className: "relative flex items-center justify-between px-4 py-2", children: [_jsx(AddMenu, { context: "box", onAddTool: onAddTool, onAddMaterial: onAddMaterial, className: "text-4xl" }), _jsx("h2", { className: "absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-gray-800", children: box.name }), _jsx("button", { onClick: onBack, className: "p-3 text-gray-700 hover:bg-gray-100 rounded-lg", children: _jsx("span", { style: { fontSize: "2.4rem", lineHeight: "1" }, children: "\u2190" }) })] }) }));
}
