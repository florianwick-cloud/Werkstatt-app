import { useState, useEffect, type ChangeEvent } from "react";
import type { Tool, Shelf, Box } from "../types/models";

// KORREKTER Input-Typ für Omit<Tool, "id">
type ToolInput = {
  name: string;
  description: string;
  shelfId: string;
  boxId: string | null;
  imageBase64: string | null;
};

type Props = {
  initialTool?: Tool;
  shelves: Shelf[];
  boxes: Box[];
  defaultShelfId?: string | null;
  defaultBoxId?: string | null;
  onSave: (tool: ToolInput) => void;
  onCancel: () => void;
};

export default function ToolForm({
  initialTool,
  shelves,
  boxes,
  defaultShelfId,
  defaultBoxId,
  onSave,
  onCancel,
}: Props) {

  // 🔶 EINHEITLICHE BUTTON-FARBE
  const BUTTON_COLOR = "#ff7a00";

  // 🔶 ALPHABETISCH SORTIERTE LISTEN (A1, A2, A10 korrekt!)
  const sortedShelves = [...shelves].sort((a, b) =>
    a.name.localeCompare(b.name, "de", { numeric: true })
  );

  const sortedBoxes = [...boxes].sort((a, b) =>
    a.name.localeCompare(b.name, "de", { numeric: true })
  );

  const [name, setName] = useState(initialTool?.name ?? "");
  const [description, setDescription] = useState(initialTool?.description ?? "");

  // LOCATION (Regal/Kiste)
  const [location, setLocation] = useState<"shelf" | "box">(
    initialTool?.boxId
      ? "box"
      : defaultBoxId
      ? "box"
      : "shelf"
  );

  // REGAL
  const [selectedShelfId, setSelectedShelfId] = useState<string>(
    initialTool?.shelfId ?? defaultShelfId ?? ""
  );

  // KISTE
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(
    initialTool?.boxId ?? defaultBoxId ?? null
  );

  // Bild initialisieren
  const initialImage = initialTool?.imageBase64 ?? null;

  const [imageUrl, setImageUrl] = useState<string | null>(initialImage);
  const [imageBase64, setImageBase64] = useState<string | null>(initialImage);

  // --- iOS-sicherer Upload-Flow ---
  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    const img = new Image();
    img.src = base64;

    img.onload = () => {
      const MAX_SIZE = 1024;
      let { width, height } = img;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = (height * MAX_SIZE) / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = (width * MAX_SIZE) / height;
          height = MAX_SIZE;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);

      const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);

      setImageBase64(resizedBase64);
      setImageUrl(resizedBase64);
    };
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const shelfBoxes = sortedBoxes.filter((b) => b.shelfId === selectedShelfId);

  // Wenn nur 1 Regal existiert → automatisch auswählen
  useEffect(() => {
    if (!selectedShelfId && sortedShelves.length === 1) {
      setSelectedShelfId(sortedShelves[0].id);
    }
  }, [sortedShelves, selectedShelfId]);

  // Box-Logik
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

    const toolInput: ToolInput = {
      name: name.trim(),
      description: description.trim(),
      shelfId: selectedShelfId,
      boxId: location === "box" ? selectedBoxId : null,
      imageBase64: imageBase64 ?? null,
    };

    onSave(toolInput);
  }

  return (
    <div style={{ padding: "1rem", background: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}>
      <h3 style={{ color: BUTTON_COLOR, marginBottom: "0.75rem" }}>
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
        placeholder="Werkzeugname"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem" }}
      />

      {/* BESCHREIBUNG */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Beschreibung"
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          minHeight: "60px",
        }}
      />

      {/* BILD-UPLOADER */}
      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem", fontWeight: 600 }}>
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
            src={imageUrl ?? `${import.meta.env.BASE_URL}placeholder.png`}
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
