<script setup>
import { COLUMNS } from "~/shared/engine/enums/Columns";

const { game, board, turn, availableMoves } = useChess();
const {
  canvasRef,
  boardSize,
  squareSize,
  drawBoard,
  preloadImages,
  highlightSelected,
  highlightAvailableMoves,
} = useCanvas(board.value);

onMounted(async () => {
  await preloadImages();

  drawBoard();
});

useEventListener(canvasRef, "click", (event) => {
  drawBoard();
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();

  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const canvaCol = Math.floor(mouseX / squareSize);
  const canvaRow = Math.floor(mouseY / squareSize);
  highlightSelected(canvaCol, canvaRow);

  const logicCol = COLUMNS[canvaCol];
  const logicRow = 8 - canvaRow;

  const availableMovesCells = availableMoves(logicCol, logicRow);
  highlightAvailableMoves(availableMovesCells);
});

// TODO add canvas drag and drop
</script>

<template>
  <div class="chess-container">
    <canvas
      ref="canvasRef"
      :width="boardSize"
      :height="boardSize"
      class="chess-board"
    ></canvas>
  </div>
</template>

<style scoped>
.chess-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #272522;
}

.chess-board {
  border: 8px solid #4a3c31;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>
