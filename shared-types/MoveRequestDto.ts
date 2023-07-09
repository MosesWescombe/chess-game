import { Move } from "./Move";
import { PieceDto } from "./PieceDto";

export type MoveRequestDto = {
    pieces: PieceDto[]; // Represents all pieces on the new board position
    previousMove: Move;
    move: Move;
}