import AddMenu from "./AddMenu/AddMenu";

type Props = {
  onAddShelf: () => void;
  onAddBox: () => void;
  onAddTool: () => void;
  onAddMaterial: () => void;
};

export default function WorkshopHeader({
  onAddShelf,
  onAddBox,
  onAddTool,
  onAddMaterial,
}: Props) {
  return (
    <header className="sticky top-0 z-20 bg-orange-500 text-white shadow-md">
      <div className="relative flex items-center justify-between px-4 py-2">

        {/* LINKS: Platzhalter für perfekte Zentrierung */}
        <div className="w-10" />

        {/* MITTE: Titel */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold pointer-events-none">
          Werkstatt
        </h1>

        {/* RECHTS: AddMenu */}
        <AddMenu
          context="workshop"
          onAddShelf={onAddShelf}
          onAddBox={onAddBox}
          onAddTool={onAddTool}
          onAddMaterial={onAddMaterial}
          className="text-4xl"
        />
      </div>
    </header>
  );
}
