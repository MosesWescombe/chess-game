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
import { Color, Coordinate, columnToFile, doCoordinatesMatch, fileToColumn } from '../types/common_types';
import { relative } from 'path';

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

   function getPiece(coordinate: Coordinate) {
      console.log(coordinate, 8 - coordinate.rank, fileToColumn(coordinate.file) - 1, squares)
      return squares[8 - coordinate.rank][fileToColumn(coordinate.file) - 1]
   }

   /**
    * Place the piece that is being dragged back on the board.
    */
   function undoPickUp() {
      if (!currentDraggedPiece) return;

      const newSquares = [...squares];

      // Add the piece back to its origonal location.
      newSquares[8 - currentDraggedPiece.coordinate.rank] = [
         ...newSquares[8 - currentDraggedPiece.coordinate.rank].slice(
            0,
            fileToColumn(currentDraggedPiece.coordinate.file) - 1
         ),
         currentDraggedPiece,
         ...newSquares[8 - currentDraggedPiece.coordinate.rank].slice(
            fileToColumn(currentDraggedPiece.coordinate.file)
         ),
      ];

      setSquares(newSquares);
   }

   /**
    * When the drag starts remove the piece from the board and instead render it in the DragOverlay.
    */
   function handleDragStart(event: any) {
      const pieceId = event.active.id as string;
      const coordinate: Coordinate = {file: pieceId[0], rank: parseInt(pieceId[2]) as number}

      console.log(coordinate)

      const newSquares = [...squares];

      // Record what piece is being moved
      const piece = getPiece(coordinate);

      console.log(piece)

      // Temporarily remove the piece from the board
      newSquares[8 - coordinate.rank] = [
         ...newSquares[8 - coordinate.rank].slice(0, fileToColumn(coordinate.file) - 1),
         undefined,
         ...newSquares[8 - coordinate.rank].slice(fileToColumn(coordinate.file)),
      ]

      // Update board
      setCurrentDraggedPiece(piece);
      setSquares(newSquares);
   }

   /**
    * When the dragging ends move the piece to the hovered square if any. This should only work if the move is legal.
    */
   async function handleDragEnd(event: any) {
      const squareId = event.over.id as string;
      const coordinate: Coordinate = {file: squareId[0], rank: parseInt(squareId[2]) as number}

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
            // setSquares(convertPiecesToBoard(newBoard.pieces));

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
         <div className="d-flex flex-column flex-wrap px-5">
            {/* Loop through rows */}
            {squares.map((row, rowIndex) => (
               <div
                  key={rowIndex}
                  className="d-flex flex-wrap flex-grow-1"
                  style={{ height: 'fit-content', position: 'relative' }}
               >
                  <div className='d-flex align-items-center' style={{position: 'absolute', left: '-2rem', height: '100px'}}>
                     <h2>{8 - rowIndex}</h2>
                  </div>
                  {/* Loop through columns */}
                  {row.map((piece, columnIndex) => (
                     <Square
                        key={`${rowIndex}${columnIndex}`}
                        coordinate={{file: columnToFile(columnIndex + 1), rank: 8 - rowIndex}}
                        piece={piece}
                     />
                  ))}
               </div>
            ))}

            <div className="d-flex">
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>a</h2>
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>b</h2>
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>c</h2>
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>d</h2>
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>e</h2>
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>f</h2>
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>g</h2>
               <h2 style={{textAlign: 'center', width: '100px', height: '100px'}}>h</h2>
            </div>
         </div>

         <DragOverlay>
               {currentDraggedPiece && (
                  <PieceComponent piece={currentDraggedPiece} />
               )}
            </DragOverlay>
      </DndContext>
   );
}
