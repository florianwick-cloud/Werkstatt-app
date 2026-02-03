import { useState, useEffect, type ChangeEvent } from "react";
import type { Tool, Shelf, Box } from "../types/models";

type Props = {
  initialTool?: Tool;
  shelves: Shelf[];
  boxes: Box[];
  onSave: (tool: Tool) => void;
  onCancel: () => void;
};

export default function ToolForm({
  initialTool,
  shelves,
  boxes,
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialTool?.name ?? "");
  const [description, setDescription] = useState(initialTool?.description ?? "");

  const [location, setLocation] = useState<"shelf" | "box">(
    initialTool?.boxId ? "box" : "shelf"
  );

  const [selectedShelfId, setSelectedShelfId] = useState<string>(
    initialTool?.shelfId ?? ""
  );

  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(
    initialTool?.boxId ?? null
  );

  // ⭐ Bild-URL (Base64)
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialTool?.imageUrl ?? null
  );

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string); // Base64 dauerhaft speicherbar
    };
    reader.readAsDataURL(file);
  }

  const shelfBoxes = boxes.filter((b) => b.shelfId === selectedShelfId);

  useEffect(() => {
    if (!selectedShelfId && shelves.length === 1) {
      setSelectedShelfId(shelves[0].id);
    }
  }, [shelves, selectedShelfId]);

  useEffect(() => {
    if (location === "shelf") {
      setSelectedBoxId(null);
    }

    if (location === "box" && shelfBoxes.length === 1) {
      setSelectedBoxId(shelfBoxes[0].id);
    }
  }, [location, selectedShelfId, shelfBoxes]);

  function handleSubmit() {
    if (!name.trim()) return;
    if (!selectedShelfId) return;
    if (location === "box" && !selectedBoxId) return;

    onSave({
      id: initialTool?.id ?? crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      shelfId: selectedShelfId,
      boxId: location === "box" ? selectedBoxId : null,
      imageUrl: imageUrl ?? undefined,
    });
  }

  return (
    <div
      style={{
        padding: "1rem",
        background: "#fff",
        borderRadius: "8px",
        border: "1px solid "#ddd",
      }}
    >
      <h3 style={{ color: "#ff7a00", marginBottom: "0.75rem" }}>
        {initialTool ? "Werkzeug bearbeiten" : "Werkzeug hinzufügen"}
      </h3>

      {/* ORT */}
      <div style={{ display: "flex", marginBottom: "0.75rem" }}>
        <button
          type="button"
          onClick={() => setLocation("shelf")}
          style={{
            flex: 1,
            padding: "0.6rem",
            background: location === "shelf" ? "#ff7a00" : "#eee",
            color: location === "shelf" ? "white" : "#333",
            border: "1px solid #ccc",
            borderRadius: "6px 0 0 6px",
            fontWeight: 600,
          }}
        >
          🧱 Regal
        </button>

        <button
          type="button"
          onClick={() => setLocation("box")}
          style={{
            flex: 1,
            padding: "0.6rem",
            background: location === "box" ? "#ff7a00" : "#eee",
            color: location === "box" ? "white" : "#333",
            border: "1px solid #ccc",
            borderRadius: "0 6px 6px 0",
            fontWeight: 600,
          }}
        >
          📦 Kiste
        </button>
      </div>

      {/* REGAL */}
      <select
        value={selectedShelfId}
        onChange={(e) => setSelectedShelfId(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
      >
        <option value="">Regal wählen…</option>
        {shelves.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* KISTE */}
      {location === "box" && (
        <select
          value={selectedBoxId ?? ""}
          onChange={(e) => setSelectedBoxId(e.target.value || null)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
        >
          <option value="">Kiste wählen…</option>
          {shelfBoxes.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      )}

      {/* NAME */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Werkzeugname"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
      />

      {/* BESCHREIBUNG */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Beschreibung (optional)"
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          minHeight: "60px",
        }}
      />

      {/* BILD-UPLOADER */}
      <div style={{ marginBottom: "0.75rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontWeight: 600,
          }}
        >
          Foto
        </label>

        <label
          style={{
            display: "inline-block",
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "0.25rem",
            borderRadius: "6px",
            background: "#fafafa",
          }}
        >
          <img
            src={imageUrl ?? "/placeholder.png"}
            alt="Werkzeugbild"
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            background: "#ff7a00",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem",
            fontWeight: 600,
          }}
        >
          Speichern
        </button>

        <button
          onClick={onCancel}
          style={{
            flex: 1,
            background: "#ccc",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem",
          }}
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
