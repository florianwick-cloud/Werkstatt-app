import { useState, useEffect } from "react";
import type { Material, Shelf, Box } from "../types/models";

type Props = {
  initialMaterial?: Material;

  shelves: Shelf[];
  boxes: Box[];

  defaultShelfId?: string | null;
  defaultBoxId?: string | null;

  onSave: (material: Material) => void;
  onCancel: () => void;
};

export default function MaterialForm({
  initialMaterial,
  shelves,
  boxes,
  defaultShelfId,
  defaultBoxId,
  onSave,
  onCancel,
}: Props) {

  // Einheitliche Button-Farbe
  const BUTTON_COLOR = "#ff7a00";

  // Alphabetische Sortierung (A1 < A10)
  const sortedShelves = [...shelves].sort((a, b) =>
    a.name.localeCompare(b.name, "de", { numeric: true })
  );

  const sortedBoxes = [...boxes].sort((a, b) =>
    a.name.localeCompare(b.name, "de", { numeric: true })
  );

  const [name, setName] = useState(initialMaterial?.name ?? "");
  const [quantity, setQuantity] = useState(initialMaterial?.quantity ?? 1);
  const [unit, setUnit] = useState(initialMaterial?.unit ?? "Stk");

  // LOCATION (Regal/Kiste) – identisch zu ToolForm
  const [location, setLocation] = useState<"shelf" | "box">(
    initialMaterial?.boxId
      ? "box"
      : defaultBoxId
      ? "box"
      : "shelf"
  );

  // REGAL – identisch zu ToolForm
  const [selectedShelfId, setSelectedShelfId] = useState<string>(
    initialMaterial?.shelfId ?? defaultShelfId ?? ""
  );

  // KISTE – identisch zu ToolForm
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(
    initialMaterial?.boxId ?? defaultBoxId ?? null
  );

  // Kisten des gewählten Regals
  const shelfBoxes = sortedBoxes.filter((b) => b.shelfId === selectedShelfId);

  // Wenn nur ein Regal existiert → automatisch auswählen
  useEffect(() => {
    if (!selectedShelfId && sortedShelves.length === 1) {
      setSelectedShelfId(sortedShelves[0].id);
    }
  }, [sortedShelves, selectedShelfId]);

  // Box-Logik – identisch zu ToolForm
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
      id: initialMaterial?.id ?? crypto.randomUUID(),
      name: name.trim(),
      quantity,
      unit,
      shelfId: selectedShelfId,
      boxId: location === "box" ? selectedBoxId : null,
    });
  }

  return (
    <div
      style={{
        padding: "1rem",
        background: "#fff",
        borderRadius: "8px",
        border: "1px solid #ddd",
      }}
    >
      <h3 style={{ color: BUTTON_COLOR, marginBottom: "0.75rem" }}>
        {initialMaterial ? "Material bearbeiten" : "Material hinzufügen"}
      </h3>

      {/* ORT */}
      <div style={{ display: "flex", marginBottom: "0.75rem" }}>
        <button
          type="button"
          onClick={() => setLocation("shelf")}
          style={{
            flex: 1,
            padding: "0.6rem",
            background: location === "shelf" ? BUTTON_COLOR : "#eee",
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
            background: location === "box" ? BUTTON_COLOR : "#eee",
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
        {sortedShelves.map((s) => (
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
        placeholder="Materialname"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
      />

      {/* MENGE */}
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
      />

      {/* EINHEIT */}
      <input
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
      />

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            background: BUTTON_COLOR,
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
            background: BUTTON_COLOR,
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem",
            fontWeight: 600,
          }}
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
