import { useState } from "react";

type Context = "workshop" | "shelf" | "box";

type Props = {
  context: Context;
  onAddShelf?: () => void;
  onAddBox?: () => void;
  onAddMaterial?: () => void;
  onAddTool?: () => void;
  className?: string; // <-- NEU
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
          fontSize: "2.4rem", // groß
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
            border: "1px solid #ddd",        // <-- Rahmen zurück
            borderRadius: "8px",             // <-- Rundung zurück
            padding: "0.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // <-- Schatten zurück
            zIndex: 9999,
            minWidth: "180px",
            color: "black",
          }}
        >
          {context === "workshop" && (
            <>
              {onAddShelf && (
                <MenuItem label="Regal hinzufügen" onClick={() => { onAddShelf(); closeMenu(); }} />
              )}
              {onAddBox && (
                <MenuItem label="Kiste hinzufügen" onClick={() => { onAddBox(); closeMenu(); }} />
              )}
              {onAddMaterial && (
                <MenuItem label="Material hinzufügen" onClick={() => { onAddMaterial(); closeMenu(); }} />
              )}
              {onAddTool && (
                <MenuItem label="Werkzeug hinzufügen" onClick={() => { onAddTool(); closeMenu(); }} />
              )}
            </>
          )}

          {context === "shelf" && (
            <>
              {onAddBox && (
                <MenuItem label="Kiste hinzufügen" onClick={() => { onAddBox(); closeMenu(); }} />
              )}
              {onAddMaterial && (
                <MenuItem label="Material hinzufügen" onClick={() => { onAddMaterial(); closeMenu(); }} />
              )}
              {onAddTool && (
                <MenuItem label="Werkzeug hinzufügen" onClick={() => { onAddTool(); closeMenu(); }} />
              )}
            </>
          )}

          {context === "box" && (
            <>
              {onAddMaterial && (
                <MenuItem label="Material hinzufügen" onClick={() => { onAddMaterial(); closeMenu(); }} />
              )}
              {onAddTool && (
                <MenuItem label="Werkzeug hinzufügen" onClick={() => { onAddTool(); closeMenu(); }} />
              )}
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
