import type Board from "../Board";
import type Cell from "../Cell";
import { Colors } from "../enums/Colors";
import { getShiftedColumn } from "../enums/Columns";
import { Pieces } from "../enums/Pieces";
import { getShiftedRow } from "../enums/Rows";
import Piece from "../Piece";
import type { Coords } from "../types/Coords";

export default class Pawn extends Piece {
  readonly directions: Coords[] = [];
  public maxMovements: number = 2;

  constructor(color: Colors) {
    super(Pieces.PAWN, color);
    const forwardDirection = this.color === Colors.WHITE ? 1 : -1;
    this.directions = [{ col: 0, row: forwardDirection }];
  }

  override availableMoves(cell: Cell, board: Board): Cell[] {
    const cells: Cell[] = [];

    if (!this.directions[0]) return [];

    const forwardDir = this.directions[0].row;

    const forward1Row = getShiftedRow(cell.row, forwardDir);

    if (forward1Row) {
      const forward1Cell = board.getCell(cell.column, forward1Row);

      if (forward1Cell && !forward1Cell.piece) {
        cells.push(forward1Cell);

        if (this.maxMovements === 2) {
          const forward2Row = getShiftedRow(cell.row, forwardDir * 2);
          if (forward2Row) {
            const forward2Cell = board.getCell(cell.column, forward2Row);
            if (forward2Cell && !forward2Cell.piece) {
              cells.push(forward2Cell);
            }
          }
        }
      }
    }

    const leftCol = getShiftedColumn(cell.column, -1);
    const rightCol = getShiftedColumn(cell.column, 1);
    const captureColumns = [leftCol, rightCol];

    for (const targetCol of captureColumns) {
      if (targetCol && forward1Row) {
        const targetCell = board.getCell(targetCol, forward1Row);

        if (
          targetCell &&
          targetCell.piece &&
          !this.isSameColor(targetCell.piece)
        ) {
          cells.push(targetCell);
        }
      }
    }

    return cells;
  }
}
