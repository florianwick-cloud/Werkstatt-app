import { useState, useRef } from "react";
import { exportDataAsZip, importDataFromFile } from "../../exportImport/dataexportImport";
import { generateQrPdf } from "../../exportImport/qrPdf";

type Context = "workshop" | "shelf" | "box";

type Props = {
  context: Context;

  // WICHTIG: Signaturen bleiben identisch zur Originalversion
  onAddShelf?: (name: string) => void;
  onAddBox?: (name: string) => void;
  onAddMaterial?: (name: string) => void;
  onAddTool?: (name: string) => void;

  className?: string;
};

export default function AddMenu({
  context,
  onAddShelf,
  onAddBox,
  onAddMaterial,
  onAddTool,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    setOpen((o) => !o);
  }

  function closeMenu() {
    setOpen(false);
  }

  async function handleExport() {
    await exportDataAsZip();
    closeMenu();
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleImportFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importDataFromFile(file);
      alert("Daten erfolgreich importiert. Bitte Seite neu laden.");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Import.");
    } finally {
      e.target.value = "";
      closeMenu();
    }
  }

  async function handleQrPdf() {
    await generateQrPdf();
    closeMenu();
  }

  return (
    <div style={{ position: "relative" }}>
      {/* PLUS BUTTON */}
      <button
        onClick={toggle}
        className={className}
        style={{
          background: "#ff7a00",
          color: "white",
          border: "none",
          padding: "0.6rem 0.9rem",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "2.4rem",
          lineHeight: "1",
        }}
        aria-label="Hinzufügen"
      >
        +
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            right: 0,
            top: "3rem",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "0.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            minWidth: "200px",
            color: "black",
          }}
        >
          {/* WORKSHOP-AKTIONEN */}
          {context === "workshop" && (
            <>
              <MenuItem
                label="Regal hinzufügen"
                onClick={() => {
                  onAddShelf?.("");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Kiste hinzufügen"
                onClick={() => {
                  onAddBox?.("");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Material hinzufügen"
                onClick={() => {
                  onAddMaterial?.("");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Werkzeug hinzufügen"
                onClick={() => {
                  onAddTool?.("");
                  closeMenu();
                }}
              />

              {/* TRENNLINIE */}
              <hr style={{ margin: "0.5rem 0", borderColor: "#eee" }} />

              {/* ⭐ NEUE FUNKTIONEN ⭐ */}
              <MenuItem label="Daten exportieren (ZIP)" onClick={handleExport} />

              <MenuItem label="Daten importieren (ZIP)" onClick={handleImportClick} />

              <MenuItem label="QR-Codes drucken (PDF)" onClick={handleQrPdf} />
            </>
          )}

          {/* SHELF-AKTIONEN */}
          {context === "shelf" && (
            <>
              <MenuItem
                label="Kiste hinzufügen"
                onClick={() => {
                  onAddBox?.("");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Material hinzufügen"
                onClick={() => {
                  onAddMaterial?.("");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Werkzeug hinzufügen"
                onClick={() => {
                  onAddTool?.("");
                  closeMenu();
                }}
              />
            </>
          )}

          {/* BOX-AKTIONEN */}
          {context === "box" && (
            <>
              <MenuItem
                label="Material hinzufügen"
                onClick={() => {
                  onAddMaterial?.("");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Werkzeug hinzufügen"
                onClick={() => {
                  onAddTool?.("");
                  closeMenu();
                }}
              />
            </>
          )}

          {/* Hidden File Input für Import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            style={{ display: "none" }}
            onChange={handleImportFileChange}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      style={{
        padding: "0.5rem",
        cursor: "pointer",
        borderRadius: "6px",
        fontSize: "0.95rem",
        color: "black",
      }}
    >
      {label}
    </div>
  );
}
