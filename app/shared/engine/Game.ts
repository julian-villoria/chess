import Board from "./Board";
import { Colors } from "./enums/Colors";

export default class Game {
  board: Board;
  turn: Colors;

  constructor(board?: Board, turn?: Colors) {
    this.board = board || new Board();
    this.turn = turn || Colors.WHITE;
  }

  public getBoard(): Board {
    return this.board;
  }

  public getTurn(): Colors {
    return this.turn;
  }

  public nextTurn(): void {
    this.turn = this.turn === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  }
}
