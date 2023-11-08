import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentlyDraggedPieceState, moveHistoryState, squaresState } from './state';
import { Move, MoveResponseDto, Piece, PieceDto } from './types/common_types';
import { convertPiecesToBoard } from './utils';

export function useApi() {
    const draggedPiece = useRecoilValue(currentlyDraggedPieceState);
    const [squares, setSquares] = useRecoilState(squaresState);
    const [moveHistory, setMoveHistory] = useRecoilState(moveHistoryState);

    function getLatestMove(): number {
        const match = moveHistory.match(/\[PlyCount "(\d+)"\]/);
        if (match && match[1]) {
            console.log(match[1]);
            return parseInt(match[1], 10);
        }

        return -1; // or undefined, or throw an error, depending on how you want to handle no match
    }

    function updatePlyCount(input: string, newPlyCount: number): string {
        return input.replace(/\[PlyCount "\d+"\]/, `[PlyCount "${newPlyCount}"]`);
    }

    function convertMoveToPGN(move: Move) {
        const piece: Piece | undefined = draggedPiece;

        if (!piece) throw Error('No piece to move');

        return `${piece.toPGN()} ${move.to.file}${move.to.rank}`;
    }

    async function makeMove(move: Move): Promise<MoveResponseDto | null> {
        try {
            const newMoveCount = getLatestMove() + 1;
            const body = {
                pgn_string: `${updatePlyCount(
                    moveHistory,
                    newMoveCount
                )} ${newMoveCount}. ${convertMoveToPGN(move)}`
            };

            const response = await axios.post<MoveResponseDto>('http://localhost:3030/move', body);

            if (response.status === 200) {
                const data = response.data;
                setMoveHistory(data.moves);

                const board = convertPiecesToBoard(data.pieces);
                setSquares(board);
                return data;
            }
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    return {
        makeMove
    };
}
