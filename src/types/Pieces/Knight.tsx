import { Color } from '../Color';
import { Piece } from './Piece';
import whiteImageFile from '../../Images/white_knight.png';
import blackImageFile from '../../Images/black_knight.png';
import { Coordinate } from '../Coordinate';

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
            { row: row + 2 * directionMultiplyer, column: column + 1 },
            { row: row + 2 * directionMultiplyer, column: column - 1 },
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
