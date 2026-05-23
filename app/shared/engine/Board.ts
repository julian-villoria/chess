import Cell from "./Cell";
import Piece from "./Piece";
import { Color } from "./enums/Color";
import { Pieces } from "./enums/Pieces";
import { columns, rows } from "./utils/consts";
import type { Column, Row } from "./utils/types";

export default class Board {
  cells: Cell[] = [];

  constructor() {
    this.createBoard();
  }

  private createBoard(): void {
    for (const column of columns) {
      for (const row of rows) {
        const initialPiece = this.getInitialPiece(column as Column, row as Row);

        this.cells.push(new Cell(column as Column, row as Row, initialPiece));
      }
    }
  }

  private getInitialPiece(column: Column, row: Row): Piece | null {
    if (row === 2) return new Piece(Pieces.PAWN, Color.WHITE);
    if (row === 7) return new Piece(Pieces.PAWN, Color.BLACK);

    if (row === 1 || row === 8) {
      const color = row === 1 ? Color.WHITE : Color.BLACK;
      const pieceMap: Record<Column, Pieces> = {
        a: Pieces.ROCK,
        b: Pieces.KNIGHT,
        c: Pieces.BISHOP,
        d: Pieces.QUEEN,
        e: Pieces.KING,
        f: Pieces.BISHOP,
        g: Pieces.KNIGHT,
        h: Pieces.ROCK,
      };
      return new Piece(pieceMap[column], color);
    }

    return null;
  }

  public getCell(column: Column, row: number): Cell | undefined {
    return this.cells.find(
      (cell) => cell.column === column && cell.row === row,
    );
  }
}
