import { useState } from "react";
import type { Box, Shelf } from "../types/models";

type Props = {
  shelves: Shelf[];
  initialBox?: Box;

  defaultShelfId?: string | null;

  onSave: (box: Box) => void;
  onCancel: () => void;
};

export default function BoxForm({
  shelves,
  initialBox,
  defaultShelfId,
  onSave,
  onCancel,
}: Props) {

  // Einheitliche Button-Farbe
  const BUTTON_COLOR = "#ff7a00";

  // Alphabetische Sortierung (A1 < A10)
  const sortedShelves = [...shelves].sort((a, b) =>
    a.name.localeCompare(b.name, "de", { numeric: true })
  );

  // Default-Regal wie in ToolForm/MaterialForm
  const [name, setName] = useState(initialBox?.name ?? "");
  const [shelfId, setShelfId] = useState(
    initialBox?.shelfId ?? defaultShelfId ?? sortedShelves[0]?.id
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const box: Box = {
      id: initialBox?.id ?? crypto.randomUUID(),
      name,
      shelfId,
    };

    onSave(box);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h3 style={{ color: BUTTON_COLOR }}>
          {initialBox ? "Kiste bearbeiten" : "Neue Kiste"}
        </h3>

        <label>Name der Kiste</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <label>Regal</label>
        <select
          value={shelfId}
          onChange={(e) => setShelfId(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          {sortedShelves.map((shelf) => (
            <option key={shelf.id} value={shelf.id}>
              {shelf.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: BUTTON_COLOR,
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "0.5rem",
          }}
        >
          {initialBox ? "Speichern" : "Hinzufügen"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: BUTTON_COLOR,
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Abbrechen
        </button>
      </form>
    </div>
  );
}
