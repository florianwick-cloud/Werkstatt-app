import { Pencil, Trash2 } from "lucide-react";
import type { Shelf, Box } from "../../types/models";

type Props = {
  shelf: Shelf;
  boxes: Box[];
  onDeleteBox: (id: string) => void;
  onEditBox: (box: Box) => void;
  onOpenBox: (boxId: string) => void;
};

export default function ShelfInfo({
  shelf,
  boxes,
  onDeleteBox,
  onEditBox,
  onOpenBox,
}: Props) {
  return (
    <section style={{ marginBottom: "1rem" }}>
      <h3>Kisten</h3>

      {boxes.length === 0 && (
        <p style={{ opacity: 0.6 }}>Keine Kisten in diesem Regal</p>
      )}

      {boxes.map((box) => (
        <div
          key={box.id}
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
          <span
            style={{ cursor: "pointer", fontWeight: 600 }}
            onClick={() => onOpenBox(box.id)}
          >
            📦 {box.name}
          </span>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => onEditBox(box)}
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

            <button
              onClick={() => onDeleteBox(box.id)}
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
      ))}
    </section>
  );
}
