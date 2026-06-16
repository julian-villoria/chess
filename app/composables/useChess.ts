import type Cell from "~/shared/engine/Cell";
import type { Column } from "~/shared/engine/enums/Columns";
import type { Row } from "~/shared/engine/enums/Rows";
import Game from "~/shared/engine/Game";

export function useChess(game: Game) {
  const selectedCell = ref<Cell | null>(null);

  function availableMoves(column: Column, row: Row): Cell[] {
    if (!game || !game.getBoard()) return [];

    const cell = game.getBoard().getCell(column, row);

    if (!cell || !cell.piece) return [];

    return cell.piece.availableMoves(cell, game.getBoard());
  }

  function canMove(from: Cell, to: Cell): boolean {
    if (!game) return false;

    return game.getBoard().canMove(from, to);
  }

  function move(from: Cell, to: Cell): void {
    if (!game) return;

    game.getBoard().move(from, to);
    game.nextTurn();
  }

  function getCell(column: Column, row: number): Cell | null {
    return game?.getBoard().getCell(column, row) || null;
  }

  return {
    game,
    selectedCell,
    canMove,
    availableMoves,
    move,
    getCell,
  };
}
