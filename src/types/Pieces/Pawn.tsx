import { Color } from '../Color';
import { PieceType } from './PieceType';
import whiteImageFile from '../../Images/white_pawn.png';
import blackImageFile from '../../Images/black_pawn.png';

export class Pawn implements PieceType {
   public image;
   public color;
   public coordinate;
   public legalPositions = [];

   constructor(row: number, column: number, color: Color) {
      this.coordinate = { row, column };
      this.color = color;

      if (color == Color.WHITE) this.image = whiteImageFile;
      else this.image = blackImageFile;
   }
}
