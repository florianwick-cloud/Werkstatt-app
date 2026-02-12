import { useState } from "react";
import type { Shelf } from "../types/models";

type Props = {
  initialShelf?: Shelf;
  onSave: (shelf: Omit<Shelf, "id"> | Shelf) => void;
  onCancel: () => void;
};

export default function ShelfForm({ initialShelf, onSave, onCancel }: Props) {
  const [name, setName] = useState(initialShelf?.name ?? "");

  const BUTTON_COLOR = "#ff7a00";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const shelf: Shelf = {
      id: initialShelf?.id ?? crypto.randomUUID(),
      name,
    };

    onSave(shelf);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg w-full max-w-sm"
      >
        <h3
          className="text-lg font-semibold mb-3"
          style={{ color: BUTTON_COLOR }}
        >
          {initialShelf ? "Regal bearbeiten" : "Neues Regal"}
        </h3>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Name des Regals"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full text-white p-2 rounded mb-2 font-semibold"
          style={{ background: BUTTON_COLOR }}
        >
          {initialShelf ? "Speichern" : "Hinzufügen"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full text-white p-2 rounded font-semibold"
          style={{ background: BUTTON_COLOR }}
        >
          Abbrechen
        </button>
      </form>
    </div>
  );
}
