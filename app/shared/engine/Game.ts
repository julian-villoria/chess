import Board from "./Board";
import { Colors } from "./enums/Colors";
import Player from "./Player";

export default class Game {
  board: Board;
  players: Player[];
  turn: Colors;

  constructor() {
    this.board = new Board();
    this.players = [
      new Player("player1", Colors.WHITE),
      new Player("player2", Colors.BLACK),
    ];
    this.turn = Colors.WHITE;
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
