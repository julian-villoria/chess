import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import type { Direction } from "../types/Direction";

export default class Queen extends Piece {
  readonly directions: Direction[] = [
    { col: 0, row: 1 },
    { col: 1, row: 0 },
    { col: 1, row: 1 },
    { col: -1, row: 1 },
    { col: 1, row: -1 },
    { col: -1, row: 0 },
    { col: 0, row: -1 },
    { col: -1, row: -1 },
  ];
  readonly maxMovements: number = 7;

  constructor(color: Colors) {
    super(Pieces.QUEEN, color);
  }
}
