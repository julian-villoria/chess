import Cell from "../Cell";
import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import { getShiftedColumn } from "../enums/Columns";
import { getShiftedRow } from "../enums/Rows";

export default class Bishop extends Piece {
  constructor(color: Colors) {
    super(Pieces.BISHOP, color);
  }

  availableMoves(cell: Cell): Cell[] {
    const cells = [];

    for (let i = -7; i <= 7; i++) {
      for (let j = -7; j <= 7; j++) {
        const column = getShiftedColumn(cell.column, i);
        const row = getShiftedRow(cell.row, j);

        if (column && row) {
          if (j === 0 && i === 0) continue;
          if (Math.abs(j) === Math.abs(i)) cells.push(new Cell(column, row));
        }
      }
    }

    return cells;
  }
}
