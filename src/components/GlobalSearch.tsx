import { useNavigate } from "react-router-dom";
import type { Shelf, Box, Tool, Material } from "../types/models";

type SearchResult =
  | { type: "shelf"; shelf: Shelf }
  | { type: "box"; box: Box; shelf: Shelf }
  | { type: "tool"; tool: Tool; shelf: Shelf; box?: Box }
  | { type: "material"; material: Material; shelf: Shelf; box?: Box };

type Props = {
  shelves: Shelf[];
  boxes: Box[];
  tools: Tool[];
  materials: Material[];
  query: string; // 🔥 Wichtig: jetzt korrekt typisiert
};

export default function GlobalSearch({
  shelves,
  boxes,
  tools,
  materials,
  query,
}: Props) {
  const navigate = useNavigate();

  const q = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  if (q) {
    // Regale
    shelves.forEach((shelf) => {
      if (shelf.name.toLowerCase().includes(q)) {
        results.push({ type: "shelf", shelf });
      }
    });

    // Kisten
    boxes.forEach((box) => {
      if (box.name.toLowerCase().includes(q)) {
        const shelf = shelves.find((s) => s.id === box.shelfId);
        if (shelf) results.push({ type: "box", box, shelf });
      }
    });

    // Werkzeuge
    tools.forEach((tool) => {
      if (tool.name.toLowerCase().includes(q)) {
        const shelf = shelves.find((s) => s.id === tool.shelfId);
        const box = boxes.find((b) => b.id === tool.boxId);
        if (shelf) results.push({ type: "tool", tool, shelf, box });
      }
    });

    // Material
    materials.forEach((material) => {
      if (material.name.toLowerCase().includes(q)) {
        const shelf = shelves.find((s) => s.id === material.shelfId);
        const box = boxes.find((b) => b.id === material.boxId);
        if (shelf)
          results.push({ type: "material", material, shelf, box });
      }
    });
  }

  return (
    <div style={{ margin: "1rem 0" }}>
      {/* Ergebnisse */}
      {q && (
        <div style={{ marginTop: "0.75rem" }}>
          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => {
                if (r.type === "shelf") navigate(`/shelf/${r.shelf.id}`);
                if (r.type === "box") navigate(`/box/${r.box.id}`);
                if (r.type === "tool")
                  navigate(r.box ? `/box/${r.box.id}` : `/shelf/${r.shelf.id}`);
                if (r.type === "material")
                  navigate(r.box ? `/box/${r.box.id}` : `/shelf/${r.shelf.id}`);
              }}
              style={{
                padding: "0.6rem",
                border: "1px solid #ddd",
                borderRadius: "6px",
                marginBottom: "0.4rem",
                cursor: "pointer",
                background: "#fff",
              }}
            >
              <strong>
                {r.type === "shelf" && "📚 Regal: "}
                {r.type === "box" && "📦 Kiste: "}
                {r.type === "tool" && "🔧 Werkzeug: "}
                {r.type === "material" && "🧱 Material: "}
              </strong>

              {r.type === "shelf"
                ? r.shelf.name
                : r.type === "box"
                ? r.box.name
                : r.type === "tool"
                ? r.tool.name
                : r.material.name}

              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                Regal: {r.shelf.name}
                {"box" in r && r.box ? ` → Kiste: ${r.box.name}` : ""}
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div style={{ fontSize: "0.85rem", color: "#888" }}>
              Keine Treffer
            </div>
          )}
        </div>
      )}
    </div>
  );
}
