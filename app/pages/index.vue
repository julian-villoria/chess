<script setup lang="ts">
import Board from "~/shared/engine/Board";
import { COLUMNS } from "~/shared/engine/enums/Columns";
import type { Row } from "~/shared/engine/enums/Rows";
import Game from "~/shared/engine/Game";
import { createPieceFromJSON } from "~/shared/engine/utils/PieceFactory";

const { data } = await useFetch("/game");

const game = computed(() => {
  if (!data.value) return;

  const objectData = JSON.parse(data.value);

  const restoredBoard = new Board();

  objectData.board.cells.forEach((rawCell: any) => {
    if (rawCell && rawCell.piece) {
      const realPiece = createPieceFromJSON(
        rawCell.piece.name,
        rawCell.piece.color,
      );

      if (realPiece) {
        const cell = restoredBoard.getCell(rawCell.column, rawCell.row);

        if (cell) cell.piece = realPiece;
      }
    }
  });

  return new Game(restoredBoard, objectData.turn);
});

const { selectedCell, availableMoves, canMove, move, getCell } = useChess(game);

const {
  canvasRef,
  boardSize,
  squareSize,
  drawBoard,
  preloadImages,
  highlightSelected,
  highlightAvailableMoves,
} = useCanvas(game);

const { sendMove, lastOpponentMove, myColor } = useMultiplayer();

onMounted(async () => {
  await preloadImages();

  drawBoard();
});

watch(lastOpponentMove, (moveData: any) => {
  if (!moveData) return;

  if (moveData.color === myColor.value) {
    return;
  }

  const fromCell = getCell(moveData.from.col, moveData.from.row);
  const toCell = getCell(moveData.to.col, moveData.to.row);

  if (fromCell && toCell) {
    move(fromCell, toCell);
    drawBoard();
  }
});

useEventListener(canvasRef, "click", (event) => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const canvaCol = Math.floor(mouseX / squareSize);
  const canvaRow = Math.floor(mouseY / squareSize);

  const logicCol = COLUMNS[canvaCol];
  const logicRow = 8 - canvaRow;
  if (!logicRow || !logicCol) return;

  const clickedCell = getCell(logicCol, logicRow);
  if (!clickedCell) return;

  if (
    selectedCell.value &&
    selectedCell.value.piece &&
    game.value?.getTurn() === selectedCell.value.piece.color
  ) {
    if (myColor.value !== selectedCell.value.piece.color) {
      return;
    }

    if (canMove(selectedCell.value, clickedCell)) {
      move(selectedCell.value, clickedCell);

      sendMove(
        selectedCell.value.column,
        selectedCell.value.row,
        clickedCell.column,
        clickedCell.row,
      );

      drawBoard();
      selectedCell.value = null;
      return;
    }
  }

  drawBoard();
  highlightSelected(canvaCol, canvaRow);

  const availableMovesCells = availableMoves(logicCol, logicRow as Row);
  highlightAvailableMoves(availableMovesCells);

  selectedCell.value = clickedCell;
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
