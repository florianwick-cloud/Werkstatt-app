import { useState } from "react";

type Context = "workshop" | "shelf" | "box";

type Props = {
  context: Context;
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

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    setOpen((o) => !o);
  }

  function closeMenu() {
    setOpen(false);
  }

  function askNameAndRun(callback?: (name: string) => void, label?: string) {
    if (!callback) return;
    const name = prompt(label ?? "Name eingeben:");
    if (name && name.trim() !== "") callback(name.trim());
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
            minWidth: "180px",
            color: "black",
          }}
        >
          {context === "workshop" && (
            <>
              <MenuItem
                label="Regal hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddShelf, "Name des Regals:");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Kiste hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddBox, "Name der Kiste:");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Material hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddMaterial, "Name des Materials:");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Werkzeug hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddTool, "Name des Werkzeugs:");
                  closeMenu();
                }}
              />
            </>
          )}

          {context === "shelf" && (
            <>
              <MenuItem
                label="Kiste hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddBox, "Name der Kiste:");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Material hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddMaterial, "Name des Materials:");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Werkzeug hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddTool, "Name des Werkzeugs:");
                  closeMenu();
                }}
              />
            </>
          )}

          {context === "box" && (
            <>
              <MenuItem
                label="Material hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddMaterial, "Name des Materials:");
                  closeMenu();
                }}
              />

              <MenuItem
                label="Werkzeug hinzufügen"
                onClick={() => {
                  askNameAndRun(onAddTool, "Name des Werkzeugs:");
                  closeMenu();
                }}
              />
            </>
          )}
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
