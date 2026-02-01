import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AddMenu from "./AddMenu/AddMenu";
export default function WorkshopHeader({ onAddShelf, onAddBox, onAddTool, onAddMaterial, }) {
    return (_jsx("header", { className: "sticky top-0 z-20 bg-orange-500 text-white shadow-md", children: _jsxs("div", { className: "relative flex items-center justify-between px-4 py-2", children: [_jsx("div", { className: "w-10" }), _jsx("h1", { className: "absolute left-1/2 -translate-x-1/2 text-xl font-semibold pointer-events-none", children: "Werkstatt" }), _jsx(AddMenu, { context: "workshop", onAddShelf: onAddShelf, onAddBox: onAddBox, onAddTool: onAddTool, onAddMaterial: onAddMaterial, className: "text-4xl" })] }) }));
}
