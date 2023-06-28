import { Color } from '../Color';
import { Piece } from './Piece';
import whiteImageFile from '../../Images/white_queen.png';
import blackImageFile from '../../Images/black_queen.png';
import { Coordinate } from '../Coordinate';

export class Queen extends Piece {
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
