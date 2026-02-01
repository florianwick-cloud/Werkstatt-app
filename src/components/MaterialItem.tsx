import { Pencil, Trash2 } from "lucide-react";
import type { Material } from "../types/models";

type Props = {
  material: Material;
  onEdit: (material: Material) => void;
  onDelete: (id: string) => void;
};

export default function MaterialItem({ material, onEdit, onDelete }: Props) {
  return (
    <div
      style={{
        padding: "0.5rem",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginTop: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        background: "#fff",
      }}
    >
      {/* Linker Bereich: Name + Menge */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{material.name}</div>
        <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
          {material.quantity} {material.unit}
        </div>
      </div>

      {/* Aktionen */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* Bearbeiten */}
        <button
          onClick={() => onEdit(material)}
          style={{
            background: "#ff7a00",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pencil size={18} strokeWidth={2} />
        </button>

        {/* Löschen */}
        <button
          onClick={() => onDelete(material.id)}
          style={{
            background: "#e53935",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Trash2 size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
