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
  image?: string;

  shelfId: string;
  boxId: string | null; // ⬅️ NIE optional
};

/* =========================
   MATERIAL
   ========================= */

export type Material = {
  id: string;
  name: string;
  quantity: number;
  unit: string;

  shelfId: string;
  boxId: string | null; // ⬅️ NIE optional
};
