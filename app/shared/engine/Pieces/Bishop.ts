import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import type { Coords } from "../types/Coords";

export default class Bishop extends Piece {
  readonly directions: Coords[] = [
    { col: 1, row: 1 },
    { col: -1, row: 1 },
    { col: 1, row: -1 },
    { col: -1, row: -1 },
  ];
  readonly maxMovements: number = 7;

  constructor(color: Colors) {
    super(Pieces.BISHOP, color);
  }
}
