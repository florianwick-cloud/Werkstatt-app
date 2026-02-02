import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function AddMenu({ context, onAddShelf, onAddBox, onAddMaterial, onAddTool, className = "", }) {
    const [open, setOpen] = useState(false);
    function toggle(e) {
        e.stopPropagation();
        setOpen((o) => !o);
    }
    function closeMenu() {
        setOpen(false);
    }
    return (_jsxs("div", { style: { position: "relative" }, children: [_jsx("button", { onClick: toggle, className: className, style: {
                    background: "#ff7a00",
                    color: "white",
                    border: "none",
                    padding: "0.6rem 0.9rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "2.4rem",
                    lineHeight: "1",
                }, "aria-label": "Hinzuf\u00FCgen", children: "+" }), open && (_jsxs("div", { onClick: (e) => e.stopPropagation(), style: {
                    position: "absolute",
                    right: 0,
                    top: "3rem",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "0.5rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    zIndex: 9999,
                    minWidth: "180px",
                    color: "black",
                }, children: [context === "workshop" && (_jsxs(_Fragment, { children: [_jsx(MenuItem, { label: "Regal hinzuf\u00FCgen", onClick: () => {
                                    onAddShelf?.("");
                                    closeMenu();
                                } }), _jsx(MenuItem, { label: "Kiste hinzuf\u00FCgen", onClick: () => {
                                    onAddBox?.("");
                                    closeMenu();
                                } }), _jsx(MenuItem, { label: "Material hinzuf\u00FCgen", onClick: () => {
                                    onAddMaterial?.("");
                                    closeMenu();
                                } }), _jsx(MenuItem, { label: "Werkzeug hinzuf\u00FCgen", onClick: () => {
                                    onAddTool?.("");
                                    closeMenu();
                                } })] })), context === "shelf" && (_jsxs(_Fragment, { children: [_jsx(MenuItem, { label: "Kiste hinzuf\u00FCgen", onClick: () => {
                                    onAddBox?.("");
                                    closeMenu();
                                } }), _jsx(MenuItem, { label: "Material hinzuf\u00FCgen", onClick: () => {
                                    onAddMaterial?.("");
                                    closeMenu();
                                } }), _jsx(MenuItem, { label: "Werkzeug hinzuf\u00FCgen", onClick: () => {
                                    onAddTool?.("");
                                    closeMenu();
                                } })] })), context === "box" && (_jsxs(_Fragment, { children: [_jsx(MenuItem, { label: "Material hinzuf\u00FCgen", onClick: () => {
                                    onAddMaterial?.("");
                                    closeMenu();
                                } }), _jsx(MenuItem, { label: "Werkzeug hinzuf\u00FCgen", onClick: () => {
                                    onAddTool?.("");
                                    closeMenu();
                                } })] }))] }))] }));
}
function MenuItem({ label, onClick, }) {
    return (_jsx("div", { onClick: (e) => {
            e.stopPropagation();
            onClick?.();
        }, style: {
            padding: "0.5rem",
            cursor: "pointer",
            borderRadius: "6px",
            fontSize: "0.95rem",
            color: "black",
        }, children: label }));
}
