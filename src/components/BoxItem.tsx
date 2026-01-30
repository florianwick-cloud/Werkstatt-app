import type { Box } from "../types/models";
import QRDisplay from "./qr/QRDisplay";

type Props = {
  box: Box;
  onOpen?: (box: Box) => void;
  onDelete?: (id: string) => void;
};

export default function BoxItem({ box, onOpen, onDelete }: Props) {
  return (
    <li
      style={{
        background: "white",
        borderRadius: "8px",
        padding: "0.8rem",
        marginBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {/* Name / Öffnen */}
      <strong
        style={{ cursor: onOpen ? "pointer" : "default", flex: 1 }}
        onClick={() => onOpen?.(box)}
      >
        {box.name}
      </strong>

      {/* QR CODE */}
      <QRDisplay value={`BOX:${box.id}`} size={64} />

      {/* Löschen */}
      {onDelete && (
        <button
          className="secondary"
          onClick={() => onDelete(box.id)}
        >
          Löschen
        </button>
      )}
    </li>
  );
}
