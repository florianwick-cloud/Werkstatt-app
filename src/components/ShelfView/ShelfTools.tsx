import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Tool, Shelf, Box } from "../../types/models";

type Props = {
  tools: Tool[];
  shelf: Shelf;
  shelves: Shelf[];
  boxes: Box[];

  onAddTool: (tool: Omit<Tool, "id">) => void;
  onEditTool: (tool: Tool) => void;
  onDeleteTool: (id: string) => void;
};

export default function ShelfTools({
  tools,
  shelf,
  shelves,
  boxes,
  onAddTool,
  onEditTool,
  onDeleteTool,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section style={{ marginBottom: "1rem" }}>
      <h3>Werkzeuge</h3>

      {tools.length === 0 && (
        <p style={{ opacity: 0.6 }}>Keine Werkzeuge in diesem Regal</p>
      )}

      {tools.map((tool) => (
        <div
          key={tool.id}
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
          {/* Thumbnail */}
          <img
            src={tool.imageBase64 ?? "/placeholder.png"}
            alt={tool.name}
            onClick={() =>
              tool.imageBase64 && setSelectedImage(tool.imageBase64)
            }
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: "6px",
              cursor: tool.imageBase64 ? "pointer" : "default",
            }}
          />

          {/* Name */}
          <span style={{ fontWeight: 600, flex: 1 }}>{tool.name}</span>

          {/* Aktionen */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => onEditTool(tool)}
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
              onClick={() => onDeleteTool(tool.id)}
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

      {/* Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out",
            zIndex: 9999,
          }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            style={{
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
            }}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Großansicht"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "8px",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
