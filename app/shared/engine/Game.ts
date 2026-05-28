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
  }
}
