import Board from "./Board";
import { Colors } from "./enums/Colors";
import Player from "./Player";

export default class Game {
  board: Board;
  players: Player[];

  constructor() {
    this.board = new Board();
    this.players = [
      new Player("player1", Colors.WHITE),
      new Player("player2", Colors.BLACK),
    ];

    const c1 = this.board.getCell("C", 1);
    const c2 = this.board.getCell("D", 5);

    console.log(this.board.canMove(c1!, c2!));
  }
}
