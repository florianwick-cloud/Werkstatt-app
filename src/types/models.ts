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

  shelfId: string;
  boxId: string | null;

  // 🔥 ID im IndexedDB-Store "images"
  imageId?: string | null;

  // 🔥 Base64 für <img src="...">
  imageUrl?: string | null;

  // 🔥 Wird nur beim Speichern genutzt (ToolForm → Route)
  imageBase64?: string | null;
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
