import type { Peer } from "crossws";
import { Colors } from "@/shared/engine/enums/Colors";

const room = "match";
const globalMatch: Record<Colors, string | null> = {
  White: null,
  Black: null,
};

export default defineWebSocketHandler({
  open(peer: Peer) {
    let assignedColor: Colors | null = null;

    if (globalMatch.White === null) {
      globalMatch.White = peer.id;
      assignedColor = Colors.WHITE;
    } else if (globalMatch.Black === null) {
      globalMatch.White = peer.id;
      assignedColor = Colors.BLACK;
    }

    peer.subscribe(room);

    peer.send(
      JSON.stringify({
        type: "color_assignment",
        color: assignedColor,
      }),
    );
  },

  message(peer, message) {
    const moveData = JSON.parse(message.text());

    peer.publish(
      room,
      JSON.stringify({
        type: "opponent_move",
        data: moveData,
      }),
    );
  },

  close(peer) {
    if (globalMatch.White === peer.id) {
      globalMatch.White = null;
      console.log(`[Global Match] Blancas se ha desconectado.`);
    }
    if (globalMatch.Black === peer.id) {
      globalMatch.Black = null;
      console.log(`[Global Match] Negras se ha desconectado.`);
    }
  },
});
