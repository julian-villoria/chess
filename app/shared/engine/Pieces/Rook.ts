import Cell from "../Cell";
import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import { COLUMNS, getShiftedColumn } from "../enums/Columns";
import { getShiftedRow, ROWS, type Row } from "../enums/Rows";

export default class Rook extends Piece {
  constructor(color: Colors) {
    super(Pieces.ROOK, color);
  }

  availableMoves(cell: Cell): Cell[] {
    const cells: Cell[] = [];

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
    }

    return cells;
  }
}
