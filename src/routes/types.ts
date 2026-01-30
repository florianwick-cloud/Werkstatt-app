import type { Shelf, Box, Tool, Material   } from "../types/models";
import type { DbAdd, DbPut, DbDelete  } from "../types/db";

export type BaseRouteProps = {
  shelves: Shelf[];
  boxes: Box[];
  tools: Tool[];
  materials: Material[];

  dbAdd: DbAdd;
  dbPut: DbPut;
  dbDelete: DbDelete;
};

export type BoxRouteProps = BaseRouteProps;
export type ShelfRouteProps = BaseRouteProps;   