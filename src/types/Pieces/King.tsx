import { Color } from '../Color';
import { Piece } from './Piece';
import whiteImageFile from '../../Images/white_king.png';
import blackImageFile from '../../Images/black_king.png';
import { Coordinate } from '../Coordinate';

export class King extends Piece {
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
