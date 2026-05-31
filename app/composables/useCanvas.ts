import type Board from "~/shared/engine/Board";
import type Cell from "~/shared/engine/Cell";
import { COLUMNS } from "~/shared/engine/enums/Columns";
import { ROWS } from "~/shared/engine/enums/Rows";

const PIECE_ASSETS: Record<string, string> = {
  White_Pawn: "/chessPieces/white_pawn.svg",
  White_Rook: "/chessPieces/white_rook.svg",
  White_Knight: "/chessPieces/white_knight.svg",
  White_Bishop: "/chessPieces/white_bishop.svg",
  White_Queen: "/chessPieces/white_queen.svg",
  White_King: "/chessPieces/white_king.svg",

  Black_Pawn: "/chessPieces/black_pawn.svg",
  Black_Rook: "/chessPieces/black_rook.svg",
  Black_Knight: "/chessPieces/black_knight.svg",
  Black_Bishop: "/chessPieces/black_bishop.svg",
  Black_Queen: "/chessPieces/black_queen.svg",
  Black_King: "/chessPieces/black_king.svg",
};

export function useCanvas(board: Board) {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const boardSize = 1024;
  const columns = COLUMNS.length;
  const rows = ROWS.length;
  const squareSize = boardSize / columns;

  const imagesCache = new Map<string, HTMLImageElement>();
  const isReady = ref(false);

  async function preloadImages(): Promise<void> {
    const promises = Object.entries(PIECE_ASSETS).map(([key, path]) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          imagesCache.set(key, img);
          resolve();
        };
      });
    });

    await Promise.all(promises);
    isReady.value = true;
  }

  function createBoard() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const squareSize = boardSize / columns;

    const lightColor = "#f0d9b5";
    const darkColor = "#b58863";

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        ctx.fillStyle = (row + column) % 2 === 0 ? lightColor : darkColor;
        ctx.fillRect(
          column * squareSize,
          row * squareSize,
          squareSize,
          squareSize,
        );

        const mappedColumn = COLUMNS[column];
        if (!mappedColumn) return;

        const logicalRow = 8 - row;

        const cell = board.getCell(mappedColumn, logicalRow);
        if (!cell?.piece) continue;

        const asset = `${cell.piece.color}_${cell.piece.constructor.name}`;

        const img = imagesCache.get(asset);
        if (!img) return;

        ctx.drawImage(
          img,
          column * squareSize,
          row * squareSize,
          squareSize,
          squareSize,
        );
      }
    }
  }

  function highlightSquare(col: number, row: number, color: string) {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 4;

    ctx.strokeRect(col * squareSize, row * squareSize, squareSize, squareSize);
  }

  return {
    boardSize,
    canvasRef,
    squareSize,
    preloadImages,
    createBoard,
    highlightSquare,
  };
}
