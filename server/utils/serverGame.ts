import Game from "~/shared/engine/Game";
import { ConnectedPlayer } from "./types/ConnectedPlayer";
import Board from "~/shared/engine/Board";

const game = new Game(new Board());
const connectedPlayers: ConnectedPlayer[] = [];

export default {
  game,
  connectedPlayers,
  addConnectedPlayer(newConnected: ConnectedPlayer): void {
    connectedPlayers.push(newConnected);
  },
  removeConnectedPlayer(peerId: string): void {
    const index = connectedPlayers.findIndex(
      (connected) => connected.peerId === peerId,
    );

    if (index > -1) connectedPlayers.splice(index, 1);
  },
};
