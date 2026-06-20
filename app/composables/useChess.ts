import type Cell from "~/shared/engine/Cell";
import type { Column } from "~/shared/engine/enums/Columns";
import type { Row } from "~/shared/engine/enums/Rows";
import Game from "~/shared/engine/Game";

export function useChess(game: Ref<Game | undefined>) {
  const selectedCell = ref<Cell | null>(null);

  function availableMoves(column: Column, row: Row): Cell[] {
    if (!game || !game.value?.board) return [];

    const cell = game.value?.board.getCell(column, row);

    if (!cell || !cell.piece) return [];

    return cell.piece.availableMoves(cell, game.value?.board);
  }

  function canMove(from: Cell, to: Cell): boolean {
    if (!game) return false;

    return Boolean(game.value?.board.canMove(from, to));
  }

  function move(from: Cell, to: Cell): void {
    if (!game) return;

    game.value?.board.move(from, to);
    game.value?.nextTurn();
  }

  function getCell(column: Column, row: number): Cell | null {
    return game.value?.board.getCell(column, row) || null;
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
