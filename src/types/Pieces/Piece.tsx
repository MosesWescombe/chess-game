import { Color } from '../Color';
import { Coordinate } from '../Coordinate';

export class Piece {
   constructor(
      public color: Color,
      public coordinate: Coordinate,
      public image: string,
      public legalPositions: Coordinate[]
   ) {}
}
