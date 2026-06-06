import { Colors } from "~/shared/engine/enums/Colors";

export function useMultiplayer() {
  const { status, data, send, close } = useWebSocket(
    `ws://localhost:3000/match`,
    {
      immediate: true,
    },
  );

  const lastOpponentMove = ref(null);
  const myColor = ref<Colors | null>(null);

  watch(data, (messageString) => {
    if (!messageString) return;

    try {
      const message = JSON.parse(messageString);

      if (message.type === "color_assignment") {
        myColor.value = message.color;
      } else if (message.type === "opponent_move") {
        console.log(message.data);
        lastOpponentMove.value = message.data;
      }
    } catch (e) {
      console.error("Error en WebSocket:", e);
    }
  });

  const sendMove = (
    fromCol: string | number,
    fromRow: number,
    toCol: string | number,
    toRow: number,
  ) => {
    const payload = {
      color: toRaw(myColor.value),
      from: { col: fromCol, row: fromRow },
      to: { col: toCol, row: toRow },
    };

    send(JSON.stringify(payload));
  };

  return {
    status,
    sendMove,
    lastOpponentMove,
    myColor,
    close,
  };
}
