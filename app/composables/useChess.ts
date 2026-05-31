import type Cell from "~/shared/engine/Cell";
import type { Column } from "~/shared/engine/enums/Columns";
import type { Row } from "~/shared/engine/enums/Rows";
import Game from "~/shared/engine/Game";

export function useChess() {
  const game = new Game();

  const board = shallowRef(game.getBoard());
  const turn = ref(game.getTurn());

  function availableMoves(column: Column, row: Row): Cell[] {
    const cell = game.board.getCell(column, row);

    if (!cell || !cell.piece) return [];

    return cell.piece.availableMoves(cell, game.getBoard());
  }

  return {
    game,
    board,
    turn,
    availableMoves,
  };
}
