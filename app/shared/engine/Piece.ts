import type Board from "./Board";
import type Cell from "./Cell";
import type { Colors } from "./enums/Colors";
import { getShiftedColumn } from "./enums/Columns";
import type { Pieces } from "./enums/Pieces";
import { getShiftedRow } from "./enums/Rows";
import type { Direction } from "./types/Direction";

export default abstract class Piece {
  abstract readonly directions: Direction[];
  abstract readonly maxMovements: number;

  constructor(
    public name: Pieces,
    public color: Colors,
  ) {}

  private isSameColor(piece: Piece): boolean {
    return piece.color === this.color;
  }

  public availableMoves(cell: Cell, board: Board): Cell[] {
    const cells: Cell[] = [];

    for (const direction of this.directions) {
      for (let i = 1; i <= this.maxMovements; i++) {
        const shiftedColumn = getShiftedColumn(cell.column, i * direction.col);
        const shiftedRow = getShiftedRow(cell.row, i * direction.row);

        if (!shiftedColumn || !shiftedRow) break;

        const targetCell = board.getCell(shiftedColumn, shiftedRow);

        if (targetCell) {
          if (!targetCell.piece) {
            cells.push(targetCell);
          } else {
            if (!this.isSameColor(targetCell.piece)) {
              cells.push(targetCell);
            }
            break;
          }
        }
      }
    }

    return cells;
  }
}
