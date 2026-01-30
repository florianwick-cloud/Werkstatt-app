import { useState, useEffect } from "react";
import { Pencil, Trash2, Save } from "lucide-react";
import type { Tool, Shelf, Box } from "../types/models";

type Props = {
  tool: Tool;
  shelves?: Shelf[];
  boxes?: Box[];
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
};

export default function ToolItem({
  tool,
  shelves,
  boxes,
  onEdit,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(tool.name);
  const [description, setDescription] = useState(tool.description || "");

  // 📍 Position
  const [location, setLocation] = useState<"shelf" | "box">(
    tool.boxId ? "box" : "shelf"
  );
  const [selectedShelfId, setSelectedShelfId] = useState(tool.shelfId);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(
    tool.boxId ?? null
  );

  // Absicherung
  const safeShelves: Shelf[] = shelves ?? [];
  const safeBoxes: Box[] = boxes ?? [];

  const boxesForShelf = safeBoxes.filter(
    (b) => b.shelfId === selectedShelfId
  );

  // 🔄 Wenn Regal gewechselt wird → Box zurücksetzen
  useEffect(() => {
    if (location === "box") {
      setSelectedBoxId((prev) =>
        prev && boxesForShelf.some((b) => b.id === prev) ? prev : null
      );
    }
  }, [selectedShelfId, location]);

  function save() {
    if (!name.trim()) return;

    onEdit({
      ...tool,
      name: name.trim(),
      description: description.trim() || undefined,
      shelfId: selectedShelfId,
      boxId: shelves && location === "box" ? selectedBoxId : null,
    });

    setIsEditing(false);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "0.75rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
        marginBottom: "0.5rem",
        background: "#fff",
        alignItems: "flex-start",
      }}
    >
      {/* ⭐ Bildanzeige korrigiert: imageUrl statt image */}
      {tool.imageUrl && (
        <img
          src={tool.imageUrl}
          alt={tool.name}
          style={{
            width: "48px",
            height: "48px",
            objectFit: "cover",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      )}

      <div style={{ flex: 1 }}>
        {isEditing ? (
          <>
            {/* Name */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Werkzeugname"
              style={{ width: "100%", marginBottom: "0.25rem" }}
            />

            {/* Beschreibung */}
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beschreibung (optional)"
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />

            {/* 📍 Umschalter */}
            {safeShelves.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <label>
                    <input
                      type="radio"
                      checked={location === "shelf"}
                      onChange={() => setLocation("shelf")}
                    />{" "}
                    Regal
                  </label>

                  <label>
                    <input
                      type="radio"
                      checked={location === "box"}
                      onChange={() => setLocation("box")}
                    />{" "}
                    Kiste
                  </label>
                </div>

                {/* Regal Auswahl */}
                <select
                  value={selectedShelfId}
                  onChange={(e) => setSelectedShelfId(e.target.value)}
                  style={{ width: "100%", marginBottom: "0.5rem" }}
                >
                  {safeShelves.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                {/* Kisten Auswahl */}
                {location === "box" && boxesForShelf.length > 0 && (
                  <select
                    value={selectedBoxId ?? ""}
                    onChange={(e) => setSelectedBoxId(e.target.value)}
                    style={{ width: "100%" }}
                  >
                    <option value="">Kiste auswählen</option>
                    {boxesForShelf.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div style={{ fontWeight: 600 }}>{tool.name}</div>
            {tool.description && (
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                {tool.description}
              </div>
            )}
          </>
        )}
      </div>

      {/* 🧰 Aktionen */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {isEditing ? (
          <button
            onClick={save}
            style={{
              padding: "0.4rem 0.6rem",
              borderRadius: "6px",
              border: "none",
              background: "#4caf50",
              color: "white",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Save size={18} strokeWidth={2} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "0.4rem 0.6rem",
              borderRadius: "6px",
              border: "none",
              background: "#ff7a00",
              color: "white",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pencil size={18} strokeWidth={2} />
          </button>
        )}

        <button
          onClick={() => onDelete(tool.id)}
          style={{
            padding: "0.4rem 0.6rem",
            borderRadius: "6px",
            border: "none",
            background: "#e53935",
            color: "white",
            fontWeight: 600,
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
