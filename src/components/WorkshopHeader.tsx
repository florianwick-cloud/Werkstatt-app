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
    <header className="sticky top-0 z-20 bg-orange-500 text-white shadow-md">
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
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold pointer-events-none">
          Werkstatt
        </h1>

        {/* RECHTS: Suche + QR */}
        <div className="flex items-center gap-2">

          {/* 🔍 Suchfeld */}
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Suchen…"
            className="px-3 py-2 border border-white/40 bg-white/20 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-white/60 placeholder-white/70"
          />

          {/* QR Button */}
          <button
            onClick={onOpenQR}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition"
          >
            <QrCode className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </header>
  );
}
