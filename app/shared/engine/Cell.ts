import Piece from "./Piece";
import type { Column, Row } from "./utils/types";

export default class Cell {
  constructor(
    public column: Column,
    public row: Row,
    public piece: Piece | null = null,
  ) {}
}
