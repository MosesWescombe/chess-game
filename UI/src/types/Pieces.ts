import { PieceDto, Color, Coordinate, PieceType } from 'shared-types';

import whiteKingImageFile from '../Images/white_king.png';
import blackKingImageFile from '../Images/black_king.png';

import whiteQueenImageFile from '../Images/white_queen.png';
import blackQueenImageFile from '../Images/black_queen.png';

import whiteBishopImageFile from '../Images/white_bishop.png';
import blackBishopImageFile from '../Images/black_bishop.png';

import whiteKnightImageFile from '../Images/white_knight.png';
import blackKnightImageFile from '../Images/black_knight.png';

import whiteRookImageFile from '../Images/white_rook.png';
import blackRookImageFile from '../Images/black_rook.png';

import whitePawnImageFile from '../Images/white_pawn.png';
import blackPawnImageFile from '../Images/black_pawn.png';

export function getPieceType(piece: Piece) {
   if (piece instanceof King) return PieceType.KING
   if (piece instanceof Queen) return PieceType.QUEEN
   if (piece instanceof Rook) return PieceType.ROOK
   if (piece instanceof Knight) return PieceType.KNIGHT
   if (piece instanceof Bishop) return PieceType.BISHOP
   return PieceType.PAWN
}

export function convertPieceToDto(piece: Piece) {
   const dto: PieceDto = {
      type: getPieceType(piece),
      color: piece.color,
      coordinate: piece.coordinate,
      legalPositions: piece.legalPositions
   }

   return dto;
}

export class Piece {
   constructor(
      public color: Color,
      public coordinate: Coordinate,
      public image: string,
      public legalPositions: Coordinate[]
   ) { }
}

export class King extends Piece {
   constructor(
      row: number,
      column: number,
      color: Color,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         [row, column],
         color == Color.WHITE ? whiteKingImageFile : blackKingImageFile,
         legalPositions
      );
   }
}

export class Queen extends Piece {
   constructor(
      row: number,
      column: number,
      color: Color,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         [row, column],

         color == Color.WHITE ? whiteQueenImageFile : blackQueenImageFile,
         legalPositions
      );
   }
}

export class Bishop extends Piece {
   constructor(
      row: number,
      column: number,
      color: Color,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         [row, column],

         color == Color.WHITE ? whiteBishopImageFile : blackBishopImageFile,
         legalPositions
      );
   }
}

export class Knight extends Piece {
   constructor(
      row: number,
      column: number,
      color: Color,
      legalPositions: Coordinate[] | undefined = undefined
   ) {
      // Generate default positions
      if (legalPositions === undefined) {
         const directionMultiplyer = color == Color.WHITE ? -1 : 1;

         legalPositions = [
            [row + 2 * directionMultiplyer, column + 1],
            [row + 2 * directionMultiplyer, column - 1],
         ];
      }

      super(
         color,
         [row, column],
         color == Color.WHITE ? whiteKnightImageFile : blackKnightImageFile,
         legalPositions
      );
   }
}

export class Rook extends Piece {
   constructor(
      row: number,
      column: number,
      color: Color,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         [row, column],

         color == Color.WHITE ? whiteRookImageFile : blackRookImageFile,
         legalPositions
      );
   }
}

export class Pawn extends Piece {
   constructor(
      row: number,
      column: number,
      color: Color,
      legalPositions: Coordinate[] | undefined = undefined
   ) {
      // Generate default positions
      if (legalPositions === undefined) {
         const directionMultiplyer = color == Color.WHITE ? -1 : 1;

         legalPositions = [
            [row + directionMultiplyer, column],
            [row + 2 * directionMultiplyer, column],
         ];
      }

      super(
         color,
         [row, column],

         color == Color.WHITE ? whitePawnImageFile : blackPawnImageFile,
         legalPositions
      );
   }
}
