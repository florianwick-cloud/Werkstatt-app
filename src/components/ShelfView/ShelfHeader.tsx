import AddMenu from "../AddMenu/AddMenu";
import type { Shelf } from "../../types/models";

export default function ShelfHeader({
  shelf,
  onBack,
  onAddBox,
  onAddMaterial,
  onAddTool,
}: {
  shelf: Shelf;
  onBack: () => void;
  onAddBox: () => void;
  onAddMaterial: () => void;
  onAddTool: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="relative flex items-center justify-between px-4 py-3">

        {/* PLUS LINKS */}
        <AddMenu
          context="shelf"
          onAddBox={onAddBox}
          onAddMaterial={onAddMaterial}
          onAddTool={onAddTool}
          className="text-4xl"
        />

        {/* TITEL ZENTRIERT */}
        <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-gray-800">
          {shelf.name}
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
