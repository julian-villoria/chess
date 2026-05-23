import type Cell from "./Cell";
import type { Colors } from "./enums/Colors";
import type { Pieces } from "./enums/Pieces";

export default abstract class Piece {
  constructor(
    public name: Pieces,
    public color: Colors,
  ) {}

  abstract availableMoves(cell: Cell): Cell[];
}
