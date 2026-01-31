import AddMenu from "../AddMenu/AddMenu";
import type { Box } from "../../types/models";

export default function BoxHeader({
  box,
  onBack,
  onAddTool,
  onAddMaterial,
}: {
  box: Box | undefined;
  onBack: () => void;
  onAddTool: () => void;
  onAddMaterial: () => void;
}) {

  if (!box) {
    return (
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="text-gray-500">Lade Kiste…</div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="relative flex items-center justify-between px-4 py-2">

        {/* PLUS LINKS */}
        <AddMenu
          context="box"
          onAddTool={onAddTool}
          onAddMaterial={onAddMaterial}
          className="text-4xl"
        />

        {/* TITEL ZENTRIERT */}
        <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-gray-800">
          {box.name}
        </h2>

        {/* ZURÜCK RECHTS — GLEICHE GRÖSSE WIE PLUS */}
        <button
          onClick={onBack}
          className="p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <span style={{ fontSize: "2.4rem", lineHeight: "1" }}>←</span>
        </button>
      </div>
    </header>
  );
}
