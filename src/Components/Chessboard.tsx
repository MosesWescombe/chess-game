import { DndContext, DragOverlay } from '@dnd-kit/core';
import Square from './Square';
import { useRecoilState } from 'recoil';
import {
   currentTurnState,
   currentlyDraggedPieceState,
   squaresState,
} from '../state';
import PieceComponent from './PieceComponent';
import { Color } from '../types/Color';

/**
 * Chess Board. Composed of all chess squares and any pieces placed on a square.
 */
export default function Chessboard() {
   const [squares, setSquares] = useRecoilState(squaresState);
   const [currentTurn, setCurrentTurn] = useRecoilState(currentTurnState);
   const [currentDraggedPiece, setCurrentDraggedPiece] = useRecoilState(
      currentlyDraggedPieceState
   );

   /**
    * When the drag starts remove the piece from the board and instead render it in the DragOverlay.
    */
   function handleDragStart(event: any) {
      const coordinate = event.active.id;
      const newSquares = [...squares];

      console.log(squares);

      // Record what piece is being moved
      const piece = squares[coordinate.row][coordinate.column];

      // Temporarily remove the piece from the board
      newSquares[coordinate.row] = [
         ...newSquares[coordinate.row].slice(0, coordinate.column),
         undefined,
         ...newSquares[coordinate.row].slice(coordinate.column + 1),
      ];

      // Update board
      setCurrentDraggedPiece(piece);
      setSquares(newSquares);
   }

   /**
    * When the dragging ends move the piece to the hovered square if any. This should only work if the move is legal.
    */
   function handleDragEnd(event: any) {
      const coordinate = event.over.id;
      const newSquares = [...squares];

      if (currentDraggedPiece) {
         const newPiece = { ...currentDraggedPiece };
         newPiece.coordinate = coordinate;

         // TODO: Check that this is a legal move

         // Add the piece to the new location. This will replace any piece currently there.
         newSquares[coordinate.row] = [
            ...newSquares[coordinate.row].slice(0, coordinate.column),
            newPiece,
            ...newSquares[coordinate.row].slice(coordinate.column + 1),
         ];

         // Change the turn
         setCurrentTurn(currentTurn == Color.WHITE ? Color.BLACK : Color.WHITE);

         setSquares(newSquares);
      }

      setCurrentDraggedPiece(undefined);
   }

   return (
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
         <div className="d-flex flex-column flex-wrap">
            {/* Loop through rows */}
            {squares.map((row, rowIndex) => (
               <div
                  key={rowIndex}
                  className="d-flex flex-wrap flex-grow-1"
                  style={{ height: 'fit-content' }}
               >
                  {/* Loop through columns */}
                  {row.map((piece, columnIndex) => (
                     <Square
                        key={`${rowIndex}${columnIndex}`}
                        coordinate={{ row: rowIndex, column: columnIndex }}
                        piece={piece}
                     />
                  ))}
               </div>
            ))}

            <DragOverlay>
               {currentDraggedPiece && (
                  <PieceComponent piece={currentDraggedPiece} />
               )}
            </DragOverlay>
         </div>
      </DndContext>
   );
}
