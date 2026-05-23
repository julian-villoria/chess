import Cell from "../Cell";
import type { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import Piece from "../Piece";
import { getShiftedColumn } from "../enums/Columns";
import { getShiftedRow } from "../enums/Rows";

export default class King extends Piece {
  constructor(color: Colors) {
    super(Pieces.KING, color);
  }

  availableMoves(cell: Cell): Cell[] {
    const cells = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const column = getShiftedColumn(cell.column, i);
        const row = getShiftedRow(cell.row, j);

        if (column && row) {
          if (i === 0 && j === 0) continue;
          cells.push(new Cell(column, row));
        }
      }
    }

    return cells;
  }
}
