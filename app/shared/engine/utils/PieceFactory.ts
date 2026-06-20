import { Colors } from "../enums/Colors";
import { Pieces } from "../enums/Pieces";
import type Piece from "../Piece";

import Pawn from "../Pieces/Pawn";
import Rook from "../Pieces/Rook";
import Knight from "../Pieces/Knight";
import Bishop from "../Pieces/Bishop";
import Queen from "../Pieces/Queen";
import King from "../Pieces/King";

export function createPieceFromJSON(name: Pieces, color: Colors): Piece | null {
  const pieceMap: Record<string, new (color: Colors) => Piece> = {
    [Pieces.ROOK]: Rook,
    [Pieces.KNIGHT]: Knight,
    [Pieces.BISHOP]: Bishop,
    [Pieces.QUEEN]: Queen,
    [Pieces.KING]: King,
    [Pieces.PAWN]: Pawn,
  };

  const PieceClass = pieceMap[name];
  return PieceClass ? new PieceClass(color) : null;
}
