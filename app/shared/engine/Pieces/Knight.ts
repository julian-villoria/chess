import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import type { Direction } from "../types/Direction";

export default class Knight extends Piece {
  readonly directions: Direction[] = [
    { col: 1, row: 2 },
    { col: 2, row: 1 },
    { col: 2, row: -1 },
    { col: 1, row: -2 },
    { col: -1, row: -2 },
    { col: -2, row: -1 },
    { col: -2, row: 1 },
    { col: -1, row: 2 },
  ];
  readonly maxMovements: number = 1;

  constructor(color: Colors) {
    super(Pieces.KNIGHT, color);
  }
}
