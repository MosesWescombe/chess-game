import { Color } from '../Color';
import { PieceType } from './PieceType';
import whiteImageFile from '../../Images/white_knight.png';
import blackImageFile from '../../Images/black_knight.png';

export class Knight implements PieceType {
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
