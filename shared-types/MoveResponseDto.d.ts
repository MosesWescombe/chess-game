import { BoardState } from "./BoardState";
import { PieceDto } from "./PieceDto";
export type MoveResponseDto = {
    currentBoardState: BoardState;
    pieces: PieceDto[];
};
