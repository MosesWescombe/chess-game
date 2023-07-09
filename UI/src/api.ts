import axios from "axios";
import { convertPieceToDto } from "./types/Pieces";
import { useRecoilValue } from "recoil";
import { currentlyDraggedPieceState, previousMoveState, squaresState } from "./state";
import { PieceDto, Move, MoveResponseDto, MoveRequestDto } from "shared-types";

export function useApi() {
    const previousMove = useRecoilValue(previousMoveState);
    const squares = useRecoilValue(squaresState)
    const draggedPiece = useRecoilValue(currentlyDraggedPieceState)

    function convertBoardToPieces() {
        const pieces: PieceDto[] = [];

        if (draggedPiece)
            pieces.push(convertPieceToDto(draggedPiece))

        for (const row of squares) {
            for (const square of row) {
                if (square) pieces.push(convertPieceToDto(square))
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