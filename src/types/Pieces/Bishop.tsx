import { Color } from '../Color';
import { Piece } from './Piece';
import whiteImageFile from '../../Images/white_bishop.png';
import blackImageFile from '../../Images/black_bishop.png';
import { Coordinate } from '../Coordinate';

export class Bishop extends Piece {
   constructor(
      row: number,
      column: number,
      color: Color,
      legalPositions: Coordinate[] = []
   ) {
      super(
         color,
         { row, column },
         color == Color.WHITE ? whiteImageFile : blackImageFile,
         legalPositions
      );
   }
}
