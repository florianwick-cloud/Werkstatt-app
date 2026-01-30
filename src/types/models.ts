/* =========================
   REGAL (EBENE 1)
   ========================= */

export type Shelf = {
  id: string;
  name: string;
};

/* =========================
   KISTE (EBENE 2)
   ========================= */

export type Box = {
  id: string;
  name: string;
  shelfId: string;
};

/* =========================
   WERKZEUG
   ========================= */

export type Tool = {
  id: string;
  name: string;
  description?: string;

  // ⭐ Wichtig: UI erwartet imageUrl
  imageUrl?: string;

  shelfId: string;
  boxId: string | null; // bleibt korrekt
};

/* =========================
   MATERIAL
   ========================= */

export type Material = {
  id: string;
  name: string;
  quantity: number;
  unit: string;

  // ⭐ Optional: falls du Material-Bilder willst
  imageUrl?: string;

  shelfId: string;
  boxId: string | null;
};
