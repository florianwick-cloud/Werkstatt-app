import { useState } from "react";
import type { Shelf, Box, Tool, Material } from "../../types/models";

import BoxHeader from "./BoxHeader";
import BoxTools from "./BoxTools";
import BoxMaterials from "./BoxMaterials";

import ToolForm from "../../forms/ToolForm";
import MaterialForm from "../../forms/MaterialForm";

import QRLabel from "../qr/QRLabel";

type Props = {
  shelf: Shelf;
  box: Box;

  shelves: Shelf[];
  boxes: Box[];

  tools: Tool[];
  materials: Material[];

  onBack: () => void;

  onAddTool: (tool: Omit<Tool, "id">) => void;
  onEditTool: (tool: Tool) => void;
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

  // 🔤 SORTIERUNG: alphabetisch nach name
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
    <div style={{ padding: "1rem" }}>
      {/* HEADER */}
      <BoxHeader
        box={box}
        shelf={shelf} 
        onBack={onBack}
        onAddTool={handleAddTool}
        onAddMaterial={handleAddMaterial}
      />

      {/* QR BUTTON */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => setShowQR(true)}
          style={{
            padding: "0.5rem 0.75rem",
            background: "#ff7a00",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          QR‑Code für Box
        </button>
      </div>

      {/* QR MODAL */}
      {showQR && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "12px",
              maxWidth: "90%",
            }}
          >
            <QRLabel
              boxId={box.id}
              boxName={box.name}
              location={shelf.name}
              size="medium"
            />

            <button
              onClick={() => setShowQR(false)}
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "0.75rem",
                background: "#333",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* TOOL FORM */}
      {showToolForm && (
        <ToolForm
          initialTool={initialTool ?? undefined}
          shelves={shelves}
          boxes={boxes}
          onSave={(tool) => {
            if (initialTool) onEditTool(tool);
            else onAddTool(tool);

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
  );
}
