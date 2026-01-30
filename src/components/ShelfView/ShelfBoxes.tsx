import QRCode from "react-qr-code";
import type { Box } from "../../types/models";

type Props = {
  boxes: Box[];
  onOpenBox: (id: string) => void;
  onDeleteBox: (id: string) => void;
  onAddBox: () => void;
};

export default function ShelfBoxes({ boxes, onOpenBox, onDeleteBox, onAddBox }: Props) {
  return (
    <section>
      <h3>Kisten</h3>

      <button onClick={onAddBox}>+ Kiste hinzufügen</button>

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
            style={{ display: "flex", gap: "0.75rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <QRCode value={box.id} size={48} />
            <button onClick={() => onDeleteBox(box.id)}>🗑</button>
          </div>
        </div>
      ))}
    </section>
  );
}
