export function searchAll({ query, shelves, boxes, tools, materials, }) {
    const q = query.trim().toLowerCase();
    if (!q)
        return [];
    const results = [];
    // 🔹 Regale durchsuchen
    shelves.forEach((shelf) => {
        if (shelf.name.toLowerCase().includes(q)) {
            results.push({
                type: "shelf",
                shelf,
            });
        }
    });
    // 🔹 Kisten durchsuchen
    boxes.forEach((box) => {
        if (box.name.toLowerCase().includes(q)) {
            const shelf = shelves.find((s) => s.id === box.shelfId);
            if (!shelf)
                return;
            results.push({
                type: "box",
                shelf,
                box,
            });
        }
    });
    // 🔹 Werkzeuge durchsuchen
    tools.forEach((tool) => {
        if (!tool.name.toLowerCase().includes(q))
            return;
        const shelf = shelves.find((s) => s.id === tool.shelfId);
        if (!shelf)
            return;
        const box = tool.boxId
            ? boxes.find((b) => b.id === tool.boxId)
            : undefined;
        results.push({
            type: "tool",
            shelf,
            box,
            tool,
        });
    });
    // 🔹 Material durchsuchen
    materials.forEach((material) => {
        if (!material.name.toLowerCase().includes(q))
            return;
        const shelf = shelves.find((s) => s.id === material.shelfId);
        if (!shelf)
            return;
        const box = material.boxId
            ? boxes.find((b) => b.id === material.boxId)
            : undefined;
        results.push({
            type: "material",
            shelf,
            box,
            material,
        });
    });
    return results;
}
