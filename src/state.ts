import { atom } from 'recoil';
import { PieceType } from './types/Pieces/PieceType';
import { Pawn } from './types/Pieces/Pawn';
import { Color } from './types/Color';
import { Rook } from './types/Pieces/Rook';
import { Bishop } from './types/Pieces/Bishop';
import { Knight } from './types/Pieces/Knight';
import { Queen } from './types/Pieces/Queen';
import { King } from './types/Pieces/King';

/**
 * Records the board state. Game starts with black on top and white below.
 */
export const squaresState = atom({
    key: 'squares',
    default: [
        [new Rook(0, 0, Color.BLACK), new Knight(0, 1, Color.BLACK), new Bishop(0, 2, Color.BLACK), new Queen(0, 3, Color.BLACK), new King(0, 4, Color.BLACK), new Bishop(0, 5, Color.BLACK), new Knight(0, 6, Color.BLACK), new Rook(0, 7, Color.BLACK)],
        [new Pawn(1, 0, Color.BLACK), new Pawn(1, 1, Color.BLACK), new Pawn(1, 2, Color.BLACK), new Pawn(1, 3, Color.BLACK), new Pawn(1, 4, Color.BLACK), new Pawn(1, 5, Color.BLACK), new Pawn(1, 6, Color.BLACK), new Pawn(1, 7, Color.BLACK)],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        [new Pawn(6, 0, Color.WHITE), new Pawn(6, 1, Color.WHITE), new Pawn(6, 2, Color.WHITE), new Pawn(6, 3, Color.WHITE), new Pawn(6, 4, Color.WHITE), new Pawn(6, 5, Color.WHITE), new Pawn(6, 6, Color.WHITE), new Pawn(6, 7, Color.WHITE)],
        [new Rook(7, 0, Color.WHITE), new Knight(7, 1, Color.WHITE), new Bishop(7, 2, Color.WHITE), new Queen(7, 3, Color.WHITE), new King(7, 4, Color.WHITE), new Bishop(7, 5, Color.WHITE), new Knight(7, 6, Color.WHITE), new Rook(7, 7, Color.WHITE)]] as (PieceType | undefined)[][],
});

/**
 * Records the current piece being dragged.
 */
export const currentlyDraggedPieceState = atom({
    key: 'draggedPiece',
    default: undefined as PieceType | undefined
})

export const currentTurnState = atom({
    key: 'currentTurn',
    default: Color.WHITE
})