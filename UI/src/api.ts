import axios from "axios";
import { MoveRequestDto } from "./types/MoveRequestDto";
import { PieceDto } from "./types/PieceDto";
import { Piece, convertPiceToDto } from "./types/Pieces";
import { Move } from "./types/Move";
import { useRecoilValue } from "recoil";
import { currentlyDraggedPieceState, previousMoveState, squaresState } from "./state";
import { MoveResponseDto } from "./types/MoveResponseDto";

export function useApi() {
    const previousMove = useRecoilValue(previousMoveState);
    const squares = useRecoilValue(squaresState)
    const draggedPiece = useRecoilValue(currentlyDraggedPieceState)

    function convertBoardToPieces() {
        const pieces: PieceDto[] = [];

        if (draggedPiece)
            pieces.push(convertPiceToDto(draggedPiece))

        for (const row of squares) {
            for (const square of row) {
                if (square) pieces.push(convertPiceToDto(square))
            }
        }

        return pieces;
    }

    async function makeMove(move: Move): Promise<MoveResponseDto | null> {
        try {
            const body = { pieces: convertBoardToPieces(), previousMove, move } as MoveRequestDto;

            const response = await axios.post<MoveResponseDto>('http://localhost:3000/makeMove', body)

            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                return data;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    return {
        makeMove
    }
}