import type { Peer } from "crossws";
import serverGame from "../utils/serverGame";
import { Colors } from "~/shared/engine/enums/Colors";
import { ConnectedPlayer } from "../utils/types/ConnectedPlayer";

const room = "match";

export default defineWebSocketHandler({
  open(peer: Peer) {
    peer.subscribe(room);

    let newPlayer: ConnectedPlayer | null = null;
    if (
      serverGame.connectedPlayers.length === 0 ||
      (serverGame.connectedPlayers.length === 1 &&
        serverGame.connectedPlayers[0]?.color === Colors.BLACK)
    ) {
      newPlayer = {
        peerId: peer.id,
        role: Roles.player,
        color: Colors.WHITE,
      };
    } else if (serverGame.connectedPlayers.length === 1) {
      newPlayer = {
        peerId: peer.id,
        role: Roles.player,
        color: Colors.BLACK,
      };
    } else {
      newPlayer = {
        peerId: peer.id,
        role: Roles.spectator,
        color: null,
      };
    }

    serverGame.addConnectedPlayer(newPlayer);

    peer.send(
      JSON.stringify({
        type: "color_assignment",
        color: newPlayer.color,
      }),
    );
  },

  message(peer, message) {
    const moveData = JSON.parse(message.text());

    serverGame.game.nextTurn();
    serverGame.game.board.move(moveData.from, moveData.to);
    peer.publish(
      room,
      JSON.stringify({
        type: "opponent_move",
        data: moveData,
      }),
    );
  },

  close(peer) {
    serverGame.removeConnectedPlayer(peer.id);
  },
});
