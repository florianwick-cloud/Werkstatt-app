import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Shelf, Box, Tool, Material } from "../types/models";
import type { SearchResult } from "../utils/search";

import QRScanner from "../components/qr/QRScanner";
import GlobalSearch from "../components/GlobalSearch";
import WorkshopHeader from "../components/WorkshopHeader";

import { QrCode, Pencil, Trash2 } from "lucide-react";

type Props = {
  shelves: Shelf[];
  boxes: Box[];
  tools: Tool[];
  materials: Material[];

  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchResults: SearchResult[];

  onAddShelf: (name: string) => void;
  onAddBox: (name: string) => void;
  onAddTool: (name: string) => void;
  onAddMaterial: (name: string) => void;

  onUpdateShelf: (id: string, name: string) => void;
  onDeleteShelf: (id: string) => void;
};

export default function WorkshopView({
  shelves,
  boxes,
  tools,
  materials,
  searchQuery,
  onSearchChange,
  searchResults,
  onAddShelf,
  onAddBox,
  onAddTool,
  onAddMaterial,
  onUpdateShelf,
  onDeleteShelf,
}: Props) {

  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  function handleScan(value: string) {
    setShowScanner(false);
    navigate(`/shelf/${value}`);
  }

  function handleAddShelf() {
    const name = prompt("Name des Regals:");
    if (name) onAddShelf(name);
  }

  function handleAddBox() {
    const name = prompt("Name der Kiste:");
    if (name) onAddBox(name);
  }

  function handleAddTool() {
    const name = prompt("Name des Werkzeugs:");
    if (name) onAddTool(name);
  }

  function handleAddMaterial() {
    const name = prompt("Name des Materials:");
    if (name) onAddMaterial(name);
  }

  function handleEditShelf(shelf: Shelf) {
    const name = prompt("Regal umbenennen:", shelf.name);
    if (name) onUpdateShelf(shelf.id, name);
  }

  const sortedShelves = [...shelves].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );

  return (
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <WorkshopHeader
        onAddShelf={handleAddShelf}
        onAddBox={handleAddBox}
        onAddTool={handleAddTool}
        onAddMaterial={handleAddMaterial}
      />

      {/* SUCHFELD + QR UNTER DEM HEADER */}
      <div className="flex items-center gap-2 px-4 py-3 bg-orange-50 border-b border-orange-200">
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Suchen…"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={() => setShowScanner(true)}
          className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          <QrCode className="w-6 h-6" />
        </button>
      </div>

      {/* INHALT */}
      <div className="p-4">

        <GlobalSearch
          shelves={shelves}
          boxes={boxes}
          tools={tools}
          materials={materials}
          query={searchQuery}
        />

        {sortedShelves.map((shelf) => (
          <div
            key={shelf.id}
            onClick={() => navigate(`/shelf/${shelf.id}`)}
            className="flex items-center p-3 border border-gray-300 rounded-lg mb-2 bg-white cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex-1 font-semibold">
              {shelf.name}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditShelf(shelf);
              }}
              className="mr-2 bg-orange-500 text-white rounded-md p-2"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteShelf(shelf.id);
              }}
              className="bg-red-500 text-white rounded-md p-2"
            >
              <Trash2 size={18} />
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
