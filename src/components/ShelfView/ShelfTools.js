import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
export default function ShelfTools({ tools, shelf, shelves, boxes, onAddTool, onEditTool, onDeleteTool, }) {
    const [selectedImage, setSelectedImage] = useState(null);
    return (_jsxs("section", { style: { marginBottom: "1rem" }, children: [_jsx("h3", { children: "Werkzeuge" }), tools.length === 0 && (_jsx("p", { style: { opacity: 0.6 }, children: "Keine Werkzeuge in diesem Regal" })), tools.map((tool) => (_jsxs("div", { style: {
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    marginTop: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    background: "#fff",
                }, children: [_jsx("img", { src: tool.imageUrl ?? "/placeholder.png", alt: tool.name, onClick: () => tool.imageUrl && setSelectedImage(tool.imageUrl), style: {
                            width: 40,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: "6px",
                            cursor: tool.imageUrl ? "pointer" : "default",
                        } }), _jsx("span", { style: { fontWeight: 600, flex: 1 }, children: tool.name }), _jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [_jsx("button", { onClick: () => onEditTool(tool), style: {
                                    background: "#ff7a00",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.3rem 0.6rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: _jsx(Pencil, { size: 18, strokeWidth: 2 }) }), _jsx("button", { onClick: () => onDeleteTool(tool.id), style: {
                                    background: "#e53935",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.3rem 0.6rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: _jsx(Trash2, { size: 18, strokeWidth: 2 }) })] })] }, tool.id))), selectedImage && (_jsxs("div", { onClick: () => setSelectedImage(null), style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.8)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "zoom-out",
                    zIndex: 9999,
                }, children: [_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }, style: {
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            background: "rgba(255,255,255,0.15)",
                            border: "none",
                            color: "white",
                            fontSize: "1.5rem",
                            padding: "0.3rem 0.6rem",
                            borderRadius: "6px",
                            cursor: "pointer",
                            backdropFilter: "blur(4px)",
                        }, children: "\u2715" }), _jsx("img", { src: selectedImage, alt: "Gro\u00DFansicht", style: {
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            objectFit: "contain",
                            borderRadius: "8px",
                            cursor: "default",
                        }, onClick: (e) => e.stopPropagation() })] }))] }));
}
