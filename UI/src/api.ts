import axios from "axios";
import { useRecoilValue } from "recoil";
import { currentlyDraggedPieceState, squaresState } from "./state";
import { Move, MoveResponseDto, Piece } from "./types/common_types";

export function useApi() {
    const squares = useRecoilValue(squaresState)
    const draggedPiece = useRecoilValue(currentlyDraggedPieceState)

    function convertMoveToPGN(move: Move) {
        const piece: Piece | undefined = draggedPiece;

        if (!piece) throw Error("No piece to move");

        return `${piece.toPGN()} ${move.to.file}${move.to.rank}`
    }

    async function makeMove(move: Move): Promise<MoveResponseDto | null> {
        try {
            const body = { moves: convertMoveToPGN(move) };

            const response = await axios.post<MoveResponseDto>('http://localhost:3030/move', body)

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