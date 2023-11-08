import { atom } from 'recoil';
import { Bishop, Color, King, Knight, Pawn, Piece, Queen, Rook } from './types/common_types';

/**
 * Records the board state. Game starts with black on top and white below.
 */
export const squaresState = atom({
    key: 'squares',
    default: [
        [
            new Rook(Color.BLACK, { file: 'a', rank: 8 }),
            new Knight(Color.BLACK, { file: 'b', rank: 8 }),
            new Bishop(Color.BLACK, { file: 'c', rank: 8 }),
            new Queen(Color.BLACK, { file: 'd', rank: 8 }),
            new King(Color.BLACK, { file: 'e', rank: 8 }),
            new Bishop(Color.BLACK, { file: 'f', rank: 8 }),
            new Knight(Color.BLACK, { file: 'g', rank: 8 }),
            new Rook(Color.BLACK, { file: 'h', rank: 8 })
        ],
        [
            new Pawn(Color.BLACK, { file: 'a', rank: 7 }),
            new Pawn(Color.BLACK, { file: 'b', rank: 7 }),
            new Pawn(Color.BLACK, { file: 'c', rank: 7 }),
            new Pawn(Color.BLACK, { file: 'd', rank: 7 }),
            new Pawn(Color.BLACK, { file: 'e', rank: 7 }),
            new Pawn(Color.BLACK, { file: 'f', rank: 7 }),
            new Pawn(Color.BLACK, { file: 'g', rank: 7 }),
            new Pawn(Color.BLACK, { file: 'h', rank: 7 })
        ],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [
            new Pawn(Color.WHITE, { file: 'a', rank: 2 }),
            new Pawn(Color.WHITE, { file: 'b', rank: 2 }),
            new Pawn(Color.WHITE, { file: 'c', rank: 2 }),
            new Pawn(Color.WHITE, { file: 'd', rank: 2 }),
            new Pawn(Color.WHITE, { file: 'e', rank: 2 }),
            new Pawn(Color.WHITE, { file: 'f', rank: 2 }),
            new Pawn(Color.WHITE, { file: 'g', rank: 2 }),
            new Pawn(Color.WHITE, { file: 'h', rank: 2 })
        ],
        [
            new Rook(Color.WHITE, { file: 'a', rank: 1 }),
            new Knight(Color.WHITE, { file: 'b', rank: 1 }),
            new Bishop(Color.WHITE, { file: 'c', rank: 1 }),
            new Queen(Color.WHITE, { file: 'd', rank: 1 }),
            new King(Color.WHITE, { file: 'e', rank: 1 }),
            new Bishop(Color.WHITE, { file: 'f', rank: 1 }),
            new Knight(Color.WHITE, { file: 'g', rank: 1 }),
            new Rook(Color.WHITE, { file: 'h', rank: 1 })
        ]
    ] as (Piece | undefined)[][]
});

/**
 * Records the current move history
 */
export const moveHistoryState = atom({
    key: 'moveHistory',
    default: '[PlyCount "0"]\n\n'
});

/**
 * Records the current piece being dragged.
 */
export const currentlyDraggedPieceState = atom({
    key: 'draggedPiece',
    default: undefined as Piece | undefined
});

export const currentTurnState = atom({
    key: 'currentTurn',
    default: Color.WHITE
});
