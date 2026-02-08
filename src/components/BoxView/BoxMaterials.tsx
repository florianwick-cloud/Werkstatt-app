import type { Material, Shelf, Box } from "../../types/models";
import MaterialItem from "../MaterialItem";

type Props = {
  materials: Material[];
  shelf: Shelf;
  boxes: Box[];
  shelves: Shelf[];

  onEditMaterial: (material: Material) => void;
  onDeleteMaterial: (id: string) => void;
};

export default function BoxMaterials({
  materials,
  shelf,
  boxes,
  shelves,
  onEditMaterial,
  onDeleteMaterial,
}: Props) {
  return (
    <section style={{ marginTop: "1rem" }}>
      <h3>Material</h3>

      {materials.length === 0 && (
        <p style={{ opacity: 0.6 }}>Kein Material in dieser Kiste</p>
      )}

      {materials.map((material) => (
        <MaterialItem
          key={material.id}
          material={material}
          onEdit={(m) => onEditMaterial(m)}
          onDelete={onDeleteMaterial}
        />
      ))}
    </section>
  );
}
