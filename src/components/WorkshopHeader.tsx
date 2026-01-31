import AddMenu from "./AddMenu/AddMenu";
import { QrCode } from "lucide-react";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;

  onAddShelf: () => void;
  onAddBox: () => void;
  onAddTool: () => void;
  onAddMaterial: () => void;

  onOpenQR: () => void;
};

export default function WorkshopHeader({
  searchQuery,
  onSearchChange,
  onAddShelf,
  onAddBox,
  onAddTool,
  onAddMaterial,
  onOpenQR,
}: Props) {
  return (
    <header className="sticky top-0 z-20 flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="relative flex items-center justify-between px-4 py-2">

        {/* LINKS: AddMenu */}
        <AddMenu
          context="workshop"
          onAddShelf={onAddShelf}
          onAddBox={onAddBox}
          onAddTool={onAddTool}
          onAddMaterial={onAddMaterial}
          className="text-4xl"
        />

        {/* MITTE: Titel */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold text-gray-800 pointer-events-none">
          Werkstatt
        </h1>

        {/* RECHTS: Suche + QR */}
        <div className="flex items-center gap-2">

          {/* 🔍 Suchfeld */}
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Suchen…"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* QR Button */}
          <button
            onClick={onOpenQR}
            className="w-12 h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <QrCode className="w-8 h-8 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </header>
  );
}
