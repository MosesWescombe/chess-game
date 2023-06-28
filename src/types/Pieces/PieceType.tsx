import { Color } from '../Color';
import { Coordinate } from '../Coordinate';

export interface PieceType {
   color: Color;
   coordinate: Coordinate;
   image: string;
   legalPositions: Coordinate[];
}
