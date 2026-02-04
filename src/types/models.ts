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

  // 🔥 Entscheidend für Bild-Persistenz in IndexedDB
  imageId?: string;

  // 🔥 UI-Preview (Object URL)
  imageUrl?: string;

  shelfId: string;
  boxId: string | null;
};

/* =========================
   MATERIAL
   ========================= */

export type Material = {
  id: string;
  name: string;
  quantity: number;
  unit: string;

  imageUrl?: string;

  shelfId: string;
  boxId: string | null;
};
