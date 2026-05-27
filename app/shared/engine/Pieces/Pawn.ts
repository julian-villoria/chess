import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import type { Direction } from "../types/Direction";

export default class Pawn extends Piece {
  readonly directions: Direction[] = [{ col: 0, row: 1 }];
  readonly maxMovements: number = 2;

  constructor(color: Colors) {
    super(Pieces.PAWN, color);
  }
}
