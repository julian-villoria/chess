import type { Color } from "./enums/Color";
import type { Pieces } from "./enums/Pieces";

export default class Piece {
  constructor(
    public name: Pieces,
    public color: Color,
  ) {}
}
