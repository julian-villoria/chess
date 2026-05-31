<script setup>
import { COLUMNS } from "~/shared/engine/enums/Columns";

const { game, board, turn, availableMoves } = useChess();
const {
  canvasRef,
  boardSize,
  squareSize,
  createBoard,
  preloadImages,
  highlightSquare,
} = useCanvas(board.value);

onMounted(async () => {
  await preloadImages();

  createBoard();
});

useEventListener(canvasRef, "click", (event) => {
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();

  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const col = Math.floor(mouseX / squareSize);
  const row = Math.floor(mouseY / squareSize);
  const mappedCol = COLUMNS[col];
  const boardRow = 8 - row;

  highlightSquare(col, row, "blue");

  const availableMovesCells = availableMoves(mappedCol, boardRow);
  availableMovesCells.forEach((move) => {
    highlightSquare(COLUMNS.indexOf(move.column), 8 - move.row, "yellow");
  });
});
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
