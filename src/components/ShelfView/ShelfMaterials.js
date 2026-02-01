import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MaterialItem from "../MaterialItem";
export default function ShelfMaterials({ materials, shelf, shelves, boxes, onAddMaterial, onEditMaterial, onDeleteMaterial, }) {
    return (_jsxs("section", { style: { marginBottom: "1rem" }, children: [_jsx("h3", { children: "Material" }), materials.length === 0 && (_jsx("p", { style: { opacity: 0.6 }, children: "Kein Material im Regal" })), materials.map((material) => (_jsx(MaterialItem, { material: material, onEdit: onEditMaterial, onDelete: onDeleteMaterial }, material.id)))] }));
}
