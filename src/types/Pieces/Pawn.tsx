import { Color } from '../Color';
import { Piece } from './Piece';
import whiteImageFile from '../../Images/white_pawn.png';
import blackImageFile from '../../Images/black_pawn.png';
import { Coordinate } from '../Coordinate';

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
            { row: row + directionMultiplyer, column },
            { row: row + 2 * directionMultiplyer, column },
         ];
      }

      super(
         color,
         { row, column },
         color == Color.WHITE ? whiteImageFile : blackImageFile,
         legalPositions
      );
   }
}
