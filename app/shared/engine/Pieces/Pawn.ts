import Cell from "../Cell";
import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import type { Row } from "../enums/Rows";

export default class Pawn extends Piece {
  constructor(color: Colors) {
    super(Pieces.PAWN, color);
  }

  availableMoves(cell: Cell): Cell[] {
    return [
      new Cell(cell.column, ++cell.row as Row),
      new Cell(cell.column, ++cell.row as Row),
    ];
  }
}
