<script setup>
import { ref, onMounted } from "vue";

const boardSize = 512; // Total width and height of the canvas in pixels
const chessCanvas = ref(null);

onMounted(() => {
  const canvas = chessCanvas.value;
  const ctx = canvas.getContext("2d");

  const columns = 8;
  const rows = 8;
  const squareSize = boardSize / columns;

  const lightColor = "#f0d9b5";
  const darkColor = "#b58863";

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? lightColor : darkColor;
      ctx.fillRect(c * squareSize, r * squareSize, squareSize, squareSize);
    }
  }
});
</script>

<template>
  <div class="chess-container">
    <canvas
      ref="chessCanvas"
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
