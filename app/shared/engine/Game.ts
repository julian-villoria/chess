import Board from "./Board";
import { Color } from "./enums/Color";
import Player from "./Player";

export default class Game {
  board: Board;
  players: Player[];

  constructor() {
    this.board = new Board();
    this.players = [
      new Player("player1", Color.WHITE),
      new Player("player2", Color.BLACK),
    ];
  }
}
