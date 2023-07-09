import { Move } from "./Move";
import { PieceDto } from "./PieceDto";
export type MoveRequestDto = {
    pieces: PieceDto[];
    previousMove: Move;
    move: Move;
};
