import QRCode from "react-qr-code";
import { Trash2 } from "lucide-react";
import type { Box } from "../../types/models";

type Props = {
  boxes: Box[];
  onOpenBox: (id: string) => void;
  onDeleteBox: (id: string) => void;
  onAddBox: () => void;
};

export default function ShelfBoxes({ boxes, onOpenBox, onDeleteBox, onAddBox }: Props) {
  return (
    <section style={{ marginTop: "1rem" }}>
      <h3>Kisten</h3>

      {/* Add Button */}
      <button
        onClick={onAddBox}
        style={{
          marginBottom: "0.75rem",
          padding: "0.5rem 0.75rem",
          background: "#ff7a00",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        + Kiste hinzufügen
      </button>

      {boxes.length === 0 && (
        <p style={{ opacity: 0.6 }}>Keine Kisten in diesem Regal</p>
      )}

      {boxes.map((box) => (
        <div
          key={box.id}
          onClick={() => onOpenBox(box.id)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "0.5rem",
            cursor: "pointer",
            background: "#fff",
          }}
        >
          <strong>{box.name}</strong>

          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* QR Code */}
            <QRCode
              value={`#/box/${box.id}`}
              size={48}
            />

            {/* Delete Button */}
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
