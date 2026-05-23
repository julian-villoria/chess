import Cell from "../Cell";
import type { Colors } from "../enums/Colors";
import { getShiftedColumn } from "../enums/Columns";
import { Pieces } from "../enums/Pieces";
import { getShiftedRow } from "../enums/Rows";
import Piece from "../Piece";

export default class Knight extends Piece {
  constructor(color: Colors) {
    super(Pieces.KNIGHT, color);
  }

  availableMoves(cell: Cell): Cell[] {
    const cells = [];

    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const column = getShiftedColumn(cell.column, i);
        const row = getShiftedRow(cell.row, j);

        if (column && row) {
          if (i === 0 && j === 0) continue;
          if (
            (Math.abs(i) === 2 && Math.abs(j) === 1) ||
            (Math.abs(i) === 1 && Math.abs(j) === 2)
          )
            cells.push(new Cell(column, row));
        }
      }
    }

    return cells;
  }
}
