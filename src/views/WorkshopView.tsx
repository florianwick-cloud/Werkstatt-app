import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Shelf, Box, Tool, Material } from "../types/models";

import QRScanner from "../components/qr/QRScanner";
import GlobalSearch from "../components/GlobalSearch";
import WorkshopHeader from "../components/WorkshopHeader";

// ⭐ Lucide Icons
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  shelves: Shelf[];
  boxes: Box[];
  tools: Tool[];
  materials: Material[];

  onAddShelf: (name: string) => void;
  onUpdateShelf: (id: string, name: string) => void;
  onDeleteShelf: (id: string) => void;
};

export default function WorkshopView({
  shelves,
  boxes,
  tools,
  materials,
  onAddShelf,
  onUpdateShelf,
  onDeleteShelf,
}: Props) {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  function handleScan(value: string) {
    setShowScanner(false);
    navigate(`/shelf/${value}`);
  }

  function handleAddShelf() {
    const name = prompt("Name des Regals:");
    if (name) onAddShelf(name);
  }

  function handleEditShelf(shelf: Shelf) {
    const name = prompt("Regal umbenennen:", shelf.name);
    if (name) onUpdateShelf(shelf.id, name);
  }

  // 🔤 SORTIERUNG: alphabetisch + numerisch korrekt
  const sortedShelves = [...shelves].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );

  return (
    <div className="flex flex-col h-full">

      {/* ⭐ Header */}
      <WorkshopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddShelf={handleAddShelf}
        onAddBox={() => alert("Kiste hinzufügen kommt später")}
        onAddTool={() => alert("Werkzeug hinzufügen kommt später")}
        onAddMaterial={() => alert("Material hinzufügen kommt später")}
        onOpenQR={() => setShowScanner(true)}
      />

      {/* ⭐ Inhalt */}
      <div style={{ padding: "1rem" }}>
        
        {/* Globale Suche */}
        <GlobalSearch
          shelves={shelves}
          boxes={boxes}
          tools={tools}
          materials={materials}
          query={searchQuery}
        />

        {/* Liste der Regale */}
        {sortedShelves.map((shelf) => (
          <div
            key={shelf.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "0.5rem",
              background: "#fff",
            }}
          >
            <div
              style={{ flex: 1, fontWeight: 600, cursor: "pointer" }}
              onClick={() => navigate(`/shelf/${shelf.id}`)}
            >
              {shelf.name}
            </div>

            {/* Bearbeiten */}
            <button
              onClick={() => handleEditShelf(shelf)}
              style={{
                marginRight: "0.5rem",
                background: "#ff7a00",
                border: "none",
                color: "white",
                borderRadius: "6px",
                padding: "0.4rem 0.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pencil size={18} strokeWidth={2} />
            </button>

            {/* Löschen */}
            <button
              onClick={() => onDeleteShelf(shelf.id)}
              style={{
                background: "#e53935",
                border: "none",
                color: "white",
                borderRadius: "6px",
                padding: "0.4rem 0.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Trash2 size={18} strokeWidth={2} />
            </button>
          </div>
        ))}

        {showScanner && (
          <QRScanner
            onScan={handleScan}
            onClose={() => setShowScanner(false)}
          />
        )}
      </div>
    </div>
  );
}
