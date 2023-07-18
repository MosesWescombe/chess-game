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
import { Color, Coordinate, PieceType, columnToFile, fileToColumn } from './common_types';

export class Piece {
   constructor(
      public color: Color,
      public coordinate: Coordinate,
      public image: string,
      public hasMoved: boolean,
      public legalPositions: Coordinate[]
   ) { }

   public toPGN(): string {
      return "";
   }
}

export class King extends Piece {
   constructor(
      color: Color,
      coordinate: Coordinate,
      hasMoved: boolean = false,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         coordinate,
         color == Color.WHITE ? whiteKingImageFile : blackKingImageFile,
         hasMoved,
         legalPositions
      );
   }

   public toPGN(): string {
      return `K${this.coordinate.file}${this.coordinate.rank}`;
   }
}

export class Queen extends Piece {
   constructor(
      color: Color,
      coordinate: Coordinate,
      hasMoved: boolean = false,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         coordinate,
         color == Color.WHITE ? whiteQueenImageFile : blackQueenImageFile,
         hasMoved,
         legalPositions
      );
   }

   public toPGN(): string {
      return `Q${this.coordinate.file}${this.coordinate.rank}`;
   }
}

export class Bishop extends Piece {
   constructor(
      color: Color,
      coordinate: Coordinate,
      hasMoved: boolean = false,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         coordinate,
         color == Color.WHITE ? whiteBishopImageFile : blackBishopImageFile,
         hasMoved,
         legalPositions
      );
   }

   public toPGN(): string {
      return `B${this.coordinate.file}${this.coordinate.rank}`;
   }
}

export class Knight extends Piece {
   constructor(
      color: Color,
      coordinate: Coordinate,
      hasMoved: boolean = false,
      legalPositions: Coordinate[] | undefined = undefined
   ) {
      // Generate default positions
      if (legalPositions === undefined) {
         const directionMultiplyer = color == Color.BLACK ? -1 : 1;

         legalPositions = [
            { rank: coordinate.rank + 2 * directionMultiplyer, file: columnToFile(fileToColumn(coordinate.file) + 1) },
            { rank: coordinate.rank + 2 * directionMultiplyer, file: columnToFile(fileToColumn(coordinate.file) - 1) },
         ];
      }

      super(
         color,
         coordinate,
         color == Color.WHITE ? whiteKnightImageFile : blackKnightImageFile,
         hasMoved,
         legalPositions
      );
   }

   public toPGN(): string {
      return `N${this.coordinate.file}${this.coordinate.rank}`;
   }
}

export class Rook extends Piece {
   constructor(
      color: Color,
      coordinate: Coordinate,
      hasMoved: boolean = false,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         coordinate,
         color == Color.WHITE ? whiteRookImageFile : blackRookImageFile,
         hasMoved,
         legalPositions
      );
   }

   public toPGN(): string {
      return `R${this.coordinate.file}${this.coordinate.rank}`;
   }
}

export class Pawn extends Piece {
   constructor(
      color: Color,
      coordinate: Coordinate,
      hasMoved: boolean = false,
      legalPositions: Coordinate[] | undefined = undefined
   ) {
      // Generate default positions
      if (legalPositions === undefined) {
         const directionMultiplyer = color == Color.BLACK ? -1 : 1;

         legalPositions = [
            { rank: coordinate.rank + directionMultiplyer, file: coordinate.file },
            { rank: coordinate.rank + 2 * directionMultiplyer, file: coordinate.file },
         ];
      }

      super(
         color,
         coordinate,
         color == Color.WHITE ? whitePawnImageFile : blackPawnImageFile,
         hasMoved,
         legalPositions
      );
   }

   public toPGN(): string {
      return `P${this.coordinate.file}${this.coordinate.rank}`;
   }
}

export function getPieceType(piece: Piece) {
   if (piece instanceof King) return PieceType.KING
   if (piece instanceof Queen) return PieceType.QUEEN
   if (piece instanceof Rook) return PieceType.ROOK
   if (piece instanceof Knight) return PieceType.KNIGHT
   if (piece instanceof Bishop) return PieceType.BISHOP
   return PieceType.PAWN
}