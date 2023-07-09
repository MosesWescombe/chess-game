import { DndContext, DragOverlay } from '@dnd-kit/core';
import Square from './Square';
import { useRecoilState } from 'recoil';
import {
   currentTurnState,
   currentlyDraggedPieceState,
   squaresState,
} from '../state';
import PieceComponent from './PieceComponent';
import { useApi } from '../api';
import { Coordinate, Color, doCoordinatesMatch } from 'shared-types';
import { convertPiecesToBoard } from '../utils';

/**
 * Chess Board. Composed of all chess squares and any pieces placed on a square.
 */
export default function Chessboard() {
   const [squares, setSquares] = useRecoilState(squaresState);
   const [currentTurn, setCurrentTurn] = useRecoilState(currentTurnState);
   const [currentDraggedPiece, setCurrentDraggedPiece] = useRecoilState(
      currentlyDraggedPieceState
   );

   const { makeMove } = useApi();

   /**
    * Place the piece that is being dragged back on the board.
    */
   function undoPickUp() {
      if (!currentDraggedPiece) return;

      const newSquares = [...squares];

      // Add the piece back to its origonal location.
      newSquares[currentDraggedPiece.coordinate[0]] = [
         ...newSquares[currentDraggedPiece.coordinate[0]].slice(
            0,
            currentDraggedPiece.coordinate[1]
         ),
         currentDraggedPiece,
         ...newSquares[currentDraggedPiece.coordinate[0]].slice(
            currentDraggedPiece.coordinate[1] + 1
         ),
      ];

      setSquares(newSquares);
   }

   /**
    * When the drag starts remove the piece from the board and instead render it in the DragOverlay.
    */
   function handleDragStart(event: any) {
      const pieceId = event.active.id as string;
      const coordinate = [
         parseInt(pieceId[0]) as number,
         parseInt(pieceId[2]) as number,
      ] as Coordinate;

      const newSquares = [...squares];

      // Record what piece is being moved
      const piece = squares[coordinate[0]][coordinate[1]];

      // Temporarily remove the piece from the board
      newSquares[coordinate[0]] = [
         ...newSquares[coordinate[0]].slice(0, coordinate[1]),
         undefined,
         ...newSquares[coordinate[0]].slice(coordinate[1] + 1),
      ];

      // Update board
      setCurrentDraggedPiece(piece);
      setSquares(newSquares);
   }

   /**
    * When the dragging ends move the piece to the hovered square if any. This should only work if the move is legal.
    */
   async function handleDragEnd(event: any) {
      const squareId = event.over.id as string;
      const coordinate = [
         parseInt(squareId[0]) as number,
         parseInt(squareId[2]) as number,
      ] as Coordinate;

      if (currentDraggedPiece) {
         const newPiece = { ...currentDraggedPiece };
         newPiece.coordinate = coordinate;

         // Cant move on self
         if (doCoordinatesMatch(currentDraggedPiece.coordinate, coordinate)) {
            setCurrentDraggedPiece(undefined);
            undoPickUp();
            return;
         }

         // Request the move from the API
         const newBoard = await makeMove({
            from: currentDraggedPiece.coordinate,
            to: coordinate,
         });

         // If the move was successful update the board
         if (newBoard) {
            // Update board
            setSquares(convertPiecesToBoard(newBoard.pieces));

            // Change the turn
            setCurrentTurn(
               currentTurn == Color.WHITE ? Color.BLACK : Color.WHITE
            );
         } else {
            undoPickUp();
         }
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
                        coordinate={[rowIndex, columnIndex]}
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
