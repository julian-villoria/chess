import { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import type { Direction } from "../types/Direction";

export default class Pawn extends Piece {
  readonly directions: Direction[] = [];
  readonly maxMovements: number = 2;

  constructor(color: Colors) {
    super(Pieces.PAWN, color);
    if (this.color === Colors.WHITE) {
      this.directions = [{ col: 0, row: 1 }];
    } else {
      this.directions = [{ col: 0, row: -1 }];
    }
  }
}
