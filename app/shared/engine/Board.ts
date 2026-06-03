import Cell from "./Cell";
import Piece from "./Piece";
import Pawn from "./Pieces/Pawn";
import { Colors } from "./enums/Colors";
import type { Row } from "./enums/Rows";
import { ROWS } from "./enums/Rows";
import type { Column } from "./enums/Columns";
import { COLUMNS } from "./enums/Columns";
import King from "./Pieces/King";
import Rook from "./Pieces/Rook";
import Knight from "./Pieces/Knight";
import Bishop from "./Pieces/Bishop";
import Queen from "./Pieces/Queen";

export default class Board {
  cells: Cell[] = [];

  constructor() {
    this.createBoard();
  }

  private createBoard(): void {
    for (const column of COLUMNS) {
      for (const row of ROWS) {
        const initialPiece = this.getInitialPiece(column as Column, row as Row);

        this.cells.push(new Cell(column as Column, row as Row, initialPiece));
      }
    }
  }

  private getInitialPiece(column: Column, row: Row): Piece | null {
    if (row === 1 || row === 8) {
      const color = row === 1 ? Colors.WHITE : Colors.BLACK;

      const pieceMap: Record<Column, new (color: Colors) => Piece> = {
        A: Rook,
        B: Knight,
        C: Bishop,
        D: Queen,
        E: King,
        F: Bishop,
        G: Knight,
        H: Rook,
      };

      const PieceClass = pieceMap[column];
      return PieceClass ? new PieceClass(color) : null;
    }

    if (row === 2 || row === 7) {
      const color = row === 2 ? Colors.WHITE : Colors.BLACK;
      return new Pawn(color);
    }

    return null;
  }

  public getCell(column: Column, row: number): Cell | undefined {
    return this.cells.find(
      (cell) => cell.column === column && cell.row === row,
    );
  }

  public canMove(from: Cell, to: Cell): boolean {
    return Boolean(
      from.piece
        ?.availableMoves(from, this)
        .find((fromCell) => fromCell === to),
    );
  }

  public move(from: Cell, to: Cell): void {
    const cellFrom = this.getCell(from.column, from.row);
    const cellTo = this.getCell(to.column, to.row);

    if (!cellFrom || !cellTo) return;
    if (!this.canMove(cellFrom, cellTo)) return;

    if (cellTo && cellFrom && cellFrom.piece) {
      if (cellFrom.piece instanceof Pawn) {
        cellFrom.piece.maxMovements = 1;
      }
      if (
        !cellTo.piece ||
        (cellTo.piece && !cellFrom.piece.isSameColor(cellTo.piece))
      )
        cellTo.piece = cellFrom.piece;

      cellFrom.piece = null;
    }
  }
}
