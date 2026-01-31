import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MaterialItem from "../MaterialItem";
export default function BoxMaterials({ materials, shelf, boxes, shelves, onEditMaterial, onDeleteMaterial, }) {
    return (_jsxs("section", { style: { marginTop: "1rem" }, children: [_jsx("h3", { children: "Material" }), materials.length === 0 && (_jsx("p", { style: { opacity: 0.6 }, children: "Kein Material in dieser Kiste" })), materials.map((material) => (_jsx(MaterialItem, { material: material, onEdit: (m) => {
                    onEditMaterial(m);
                }, onDelete: onDeleteMaterial }, material.id)))] }));
}
