import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Shelf, Box, Tool, Material } from "../types/models";
import type { SearchResult } from "../utils/search";

import QRScanner from "../components/qr/QRScanner";
import GlobalSearch from "../components/GlobalSearch";
import WorkshopHeader from "../components/WorkshopHeader";

import BoxForm from "../forms/BoxForm";
import ToolForm from "../forms/ToolForm";
import MaterialForm from "../forms/MaterialForm";
import ShelfForm from "../forms/ShelfForm";

import { QrCode, Pencil, Trash2 } from "lucide-react";

type Props = {
  shelves: Shelf[];
  boxes: Box[];
  tools: Tool[];
  materials: Material[];

  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchResults: SearchResult[];

  onAddShelf: (shelf: Omit<Shelf, "id">) => void;
  onAddBox: (box: Omit<Box, "id">) => void;
  onAddTool: (tool: Omit<Tool, "id">) => void;
  onAddMaterial: (material: Omit<Material, "id">) => void;

  onUpdateShelf: (shelf: Shelf) => void;
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

  // FORM STATES
  const [showShelfForm, setShowShelfForm] = useState(false);
  const [showBoxForm, setShowBoxForm] = useState(false);
  const [showToolForm, setShowToolForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);

  const [initialShelf, setInitialShelf] = useState<Shelf | null>(null);
  const [initialBox, setInitialBox] = useState<Box | null>(null);
  const [initialTool, setInitialTool] = useState<Tool | null>(null);
  const [initialMaterial, setInitialMaterial] = useState<Material | null>(null);

  function handleScan(value: string) {
    setShowScanner(false);
    navigate(`/shelf/${value}`);
  }

  // ADD HANDLER
  function handleAddShelf() {
    setInitialShelf(null);
    setShowShelfForm(true);
  }

  function handleAddBox() {
    setInitialBox(null);
    setShowBoxForm(true);
  }

  function handleAddTool() {
    setInitialTool(null);
    setShowToolForm(true);
  }

  function handleAddMaterial() {
    setInitialMaterial(null);
    setShowMaterialForm(true);
  }

  // EDIT SHELF
  function handleEditShelf(shelf: Shelf) {
    setInitialShelf(shelf);
    setShowShelfForm(true);
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

      {/* SUCHFELD + QR */}
      <div className="flex items-center gap-2 px-4 py-3 bg-orange-50 border-b border-orange-200">
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Suchen…"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
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

      {/* SHELF FORM */}
{showShelfForm && (
  <ShelfForm
    initialShelf={initialShelf ?? undefined}
    onSave={(shelf) => {
      if (initialShelf) {
        onUpdateShelf({
          ...shelf,
          id: initialShelf.id, // id sicherstellen
        });
      } else {
        onAddShelf(shelf);
      }

      setShowShelfForm(false);
      setInitialShelf(null);
    }}
    onCancel={() => {
      setShowShelfForm(false);
      setInitialShelf(null);
    }}
  />
)}


      {/* BOX FORM */}
      {showBoxForm && (
        <BoxForm
          shelves={shelves}
          initialBox={initialBox ?? undefined}
          onSave={(box) => {
            if (initialBox) {
              // EDIT
              // (du hast keinen onUpdateBox im Workshop, daher ignoriert)
            } else {
              onAddBox(box);
            }
            setShowBoxForm(false);
            setInitialBox(null);
          }}
          onCancel={() => {
            setShowBoxForm(false);
            setInitialBox(null);
          }}
        />
      )}

      {/* TOOL FORM */}
      {showToolForm && (
        <ToolForm
          initialTool={initialTool ?? undefined}
          shelves={shelves}
          boxes={boxes}
          onSave={(tool) => {
            if (initialTool) {
              // EDIT
            } else {
              onAddTool(tool);
            }
            setShowToolForm(false);
            setInitialTool(null);
          }}
          onCancel={() => {
            setShowToolForm(false);
            setInitialTool(null);
          }}
        />
      )}

      {/* MATERIAL FORM */}
      {showMaterialForm && (
        <MaterialForm
          initialMaterial={initialMaterial ?? undefined}
          shelves={shelves}
          boxes={boxes}
          onSave={(material) => {
            if (initialMaterial) {
              // EDIT
            } else {
              onAddMaterial(material);
            }
            setShowMaterialForm(false);
            setInitialMaterial(null);
          }}
          onCancel={() => {
            setShowMaterialForm(false);
            setInitialMaterial(null);
          }}
        />
      )}

    </div>
  );
}
