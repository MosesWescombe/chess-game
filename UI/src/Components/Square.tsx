import { useRecoilState } from 'recoil';
import { Piece } from '../types/Pieces';
import { Droppable } from './Droppable';
import PieceComponent from './PieceComponent';
import { currentlyDraggedPieceState } from '../state';
import { Coordinate } from 'shared-types';

/**
 * A single cell on the chess board
 * @param coordinate X and Y location of the square. Used to find related pieces.
 */
export default function Square({
   coordinate,
   piece,
}: {
   coordinate: Coordinate;
   piece: Piece | undefined;
}) {
   const [currentDraggedPiece] = useRecoilState(currentlyDraggedPieceState);

   /**
    * Check that the square is white. Squares alternate color accross a row and down a column
    * starting with a white square in the top left.
    */
   function isWhiteSquare(): boolean {
      if (coordinate[0] % 2 === 0) return coordinate[1] % 2 === 0;
      else return coordinate[1] % 2 === 1;
   }

   const isLegalMoveSquare = (): boolean => {
      if (!currentDraggedPiece) return false;

      return (
         currentDraggedPiece.legalPositions.findIndex(
            (c) => c[0] === coordinate[0] && c[1] === coordinate[1]
         ) !== -1
      );
   };

   return (
      <Droppable id={`${coordinate[0]},${coordinate[1]}`}>
         <div
            className="d-flex"
            style={{
               color: 'white',
               backgroundColor: isWhiteSquare() ? '#fae2b1' : '#a37043',
               width: '100px',
               height: '100px',
            }}
         >
            <div
               className={`fill 
                  ${
                     isLegalMoveSquare()
                        ? isLegalMoveSquare() && piece
                           ? 'legal-take-overlay'
                           : 'legal-move-overlay'
                        : ''
                  }
               `}
            >
               {/* Render any related piece. */}
               {piece && <PieceComponent piece={piece} />}
            </div>
         </div>
      </Droppable>
   );
}
