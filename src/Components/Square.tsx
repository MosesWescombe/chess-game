import { Coordinate } from '../types/Coordinate';
import { PieceType } from '../types/Pieces/PieceType';
import { Droppable } from './Droppable';
import Piece from './Piece';

/**
 * A single cell on the chess board
 * @param coordinate X and Y location of the square. Used to find related pieces.
 */
export default function Square({
   coordinate,
   square,
}: {
   coordinate: Coordinate;
   square: PieceType | undefined;
}) {
   /**
    * Check that the square is white. Squares alternate color accross a row and down a column
    * starting with a white square in the top left.
    */
   function isWhiteSquare(): boolean {
      if (coordinate.row % 2 === 0) return coordinate.column % 2 === 0;
      else return coordinate.column % 2 === 1;
   }

   return (
      <Droppable id={coordinate}>
         <div
            className="d-flex"
            style={{
               color: 'white',
               backgroundColor: isWhiteSquare() ? '#fae2b1' : '#a37043',
               width: '100px',
               height: '100px',
            }}
         >
            {/* Render any related piece. */}
            {square && <Piece piece={square} />}
         </div>
      </Droppable>
   );
}
