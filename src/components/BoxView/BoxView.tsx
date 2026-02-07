import { useState } from "react";
import type { Shelf, Box, Tool, Material } from "../../types/models";

import BoxHeader from "./BoxHeader";
import BoxTools from "./BoxTools";
import BoxMaterials from "./BoxMaterials";

import ToolForm from "../../forms/ToolForm";
import MaterialForm from "../../forms/MaterialForm";

import QRLabel from "../qr/QRLabel";
import QRScanner from "../qr/QRScanner";

type Props = {
  shelf: Shelf;
  box: Box;

  shelves: Shelf[];
  boxes: Box[];

  tools: Tool[];
  materials: Material[];

  onBack: () => void;

  // ⭐ Neue Signatur: KEIN Blob mehr
  onAddTool: (toolInput: any) => void;
  onEditTool: (toolInput: any) => void;
  onDeleteTool: (id: string) => void;

  onAddMaterial: (material: Omit<Material, "id">) => void;
  onEditMaterial: (material: Material) => void;
  onDeleteMaterial: (id: string) => void;
};

export default function BoxView({
  shelf,
  box,
  shelves,
  boxes,
  tools,
  materials,
  onBack,
  onAddTool,
  onEditTool,
  onDeleteTool,
  onAddMaterial,
  onEditMaterial,
  onDeleteMaterial,
}: Props) {
  const [showToolForm, setShowToolForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);

  const [initialTool, setInitialTool] = useState<Tool | null>(null);
  const [initialMaterial, setInitialMaterial] = useState<Material | null>(null);

  const [showQR, setShowQR] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  // SORTIERUNG
  const boxTools = tools
    .filter((t) => t.boxId === box.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const boxMaterials = materials
    .filter((m) => m.boxId === box.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  function handleAddTool() {
    setInitialTool(null);
    setShowToolForm(true);
  }

  function handleAddMaterial() {
    setInitialMaterial(null);
    setShowMaterialForm(true);
  }

  return (
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <BoxHeader
        box={box}
        shelf={shelf}
        onBack={onBack}
        onAddTool={handleAddTool}
        onAddMaterial={handleAddMaterial}
      />

      {/* SUCHFELD + QR-SCANNER + QR-CODE BUTTON */}
      <div className="flex items-center gap-2 px-4 py-3 bg-orange-50 border-b border-orange-200">

        <input
          type="text"
          placeholder="In dieser Box suchen…"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={() => setShowQRScanner(true)}
          className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 0h6v6h-6v-6z" />
          </svg>
        </button>

        <button
          onClick={() => setShowQR(true)}
          className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition text-sm font-semibold whitespace-nowrap"
        >
          Box‑QR
        </button>
      </div>

      {/* QR MODAL */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 rounded-xl max-w-[90%]">
            <QRLabel
              id={box.id}
              name={box.name}
              type="box"
              location="Box"
              size="medium"
            />

            <button
              onClick={() => setShowQR(false)}
              className="mt-4 w-full py-2 bg-gray-800 text-white rounded-md font-semibold"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* QR SCANNER */}
      {showQRScanner && (
        <QRScanner
          onScan={(value) => {
          setShowQRScanner(false);
          window.location.href = `${window.location.origin}/Werkstatt-app-Flo/${value}`;
          }}
          onClose={() => setShowQRScanner(false)}
        />
      )}

      {/* TOOL FORM */}
      {showToolForm && (
        <ToolForm
          initialTool={initialTool ?? undefined}
          shelves={shelves}
          boxes={boxes}
          onSave={(toolInput) => {
            if (initialTool) {
              onEditTool({ ...toolInput, id: initialTool.id });
            } else {
              onAddTool(toolInput);
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
            if (initialMaterial) onEditMaterial(material);
            else onAddMaterial(material);

            setShowMaterialForm(false);
            setInitialMaterial(null);
          }}
          onCancel={() => {
            setShowMaterialForm(false);
            setInitialMaterial(null);
          }}
        />
      )}

      {/* CONTENT */}
      <div className="p-4">

        <BoxTools
          tools={boxTools}
          shelf={shelf}
          shelves={shelves}
          boxes={boxes}
          onEditTool={(tool) => {
            setInitialTool(tool);
            setShowToolForm(true);
          }}
          onDeleteTool={onDeleteTool}
        />

        <BoxMaterials
          materials={boxMaterials}
          shelf={shelf}
          shelves={shelves}
          boxes={boxes}
          onEditMaterial={(material) => {
            setInitialMaterial(material);
            setShowMaterialForm(true);
          }}
          onDeleteMaterial={onDeleteMaterial}
        />

      </div>
    </div>
  );
}
