import { BoardState } from "./BoardState";
import { PieceDto } from "./PieceDto";

export type MoveResponseDto = {
    currentBoardState: BoardState;
    pieces: PieceDto[]; // Represents all pieces on the new board position
}