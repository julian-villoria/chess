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
  removeConnectedPlayer(connectedLeave: ConnectedPlayer): void {
    const index = connectedPlayers.findIndex(
      (connected) => connected.peerId === connectedLeave.peerId,
    );

    if (index > -1) connectedPlayers.splice(index, 1);
  },
};
