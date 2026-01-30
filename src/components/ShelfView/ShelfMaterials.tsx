import type { Material, Shelf, Box } from "../../types/models";
import MaterialItem from "../MaterialItem";

type Props = {
  materials: Material[];
  shelf: Shelf;
  shelves: Shelf[];
  boxes: Box[];

  onEditMaterial: (material: Material) => void;
  onDeleteMaterial: (id: string) => void;
};

export default function ShelfMaterials({
  materials,
  shelf,
  shelves,
  boxes,
  onEditMaterial,
  onDeleteMaterial,
}: Props) {
  return (
    <section style={{ marginBottom: "1rem" }}>
      <h3>Material</h3>

      {materials.length === 0 && (
        <p style={{ opacity: 0.6 }}>Kein Material im Regal</p>
      )}

      {materials.map((material) => (
        <MaterialItem
          key={material.id}
          material={material}
          onEdit={onEditMaterial}
          onDelete={onDeleteMaterial}
        />
      ))}
    </section>
  );
}
