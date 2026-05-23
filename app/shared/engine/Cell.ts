import Piece from "./Piece";
import type { Column } from "./enums/Columns";
import type { Row } from "./enums/Rows";

export default class Cell {
  constructor(
    public column: Column,
    public row: Row,
    public piece: Piece | null = null,
  ) {}
}
