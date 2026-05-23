import Cell from "../Cell";
import type { Colors } from "../enums/Colors";
import { getShiftedColumn } from "../enums/Columns";
import { Pieces } from "../enums/Pieces";
import { getShiftedRow, ROWS } from "../enums/Rows";
import Piece from "../Piece";

export default class Queen extends Piece {
  constructor(color: Colors) {
    super(Pieces.QUEEN, color);
  }

  availableMoves(cell: Cell): Cell[] {
    const cells = [];

    for (let i = -7; i <= 7; i++) {
      if (i === 0) continue;

      const column = getShiftedColumn(cell.column, i);
      if (column) {
        cells.push(new Cell(column, cell.row));
      }

      const row = getShiftedRow(cell.row, i);
      if (row) {
        cells.push(new Cell(cell.column, row));
      }

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
