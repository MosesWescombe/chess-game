import { useRecoilState } from 'recoil';
import { Piece } from '../types/Pieces';
import { Droppable } from './Droppable';
import PieceComponent from './PieceComponent';
import { currentlyDraggedPieceState } from '../state';
import { Coordinate, doCoordinatesMatch, fileToColumn } from '../types/common_types';

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
      if (fileToColumn(coordinate.file) % 2 !== 0) return coordinate.rank % 2 === 0;
      else return coordinate.rank % 2 === 1;
   }

   const isLegalMoveSquare = (): boolean => {
      if (!currentDraggedPiece) return false;

      return (
         currentDraggedPiece.legalPositions.findIndex(
            (c) => doCoordinatesMatch(c, coordinate)
         ) !== -1
      );
   };

   return (
      <Droppable id={`${coordinate.file},${coordinate.rank}`}>
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
