import AddMenu from "../AddMenu/AddMenu";
import type { Box, Shelf } from "../../types/models";

type Props = {
  box: Box;
  shelf: Shelf;
  onBack: () => void;
  onAddMaterial: () => void;
  onAddTool: () => void;
};

export default function BoxHeader({
  box,
  shelf,
  onBack,
  onAddMaterial,
  onAddTool,
}: Props) {
  return (
    <header className="sticky top-0 z-20 bg-orange-500 text-white shadow-md">
      <div className="relative flex items-center justify-between px-4 py-2">

        {/* LINKS: Zurück */}
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition"
        >
          <span style={{ fontSize: "2.2rem", lineHeight: "1" }}>←</span>
        </button>

        {/* MITTE: Titel */}
        <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold pointer-events-none">
          {box.name}
        </h2>

        {/* RECHTS: AddMenu */}
        <AddMenu
          context="box"
          onAddMaterial={onAddMaterial}
          onAddTool={onAddTool}
          className="text-4xl"
        />
      </div>
    </header>
  );
}
