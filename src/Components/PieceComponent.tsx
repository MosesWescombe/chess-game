import { Draggable } from './Draggable';
import { Piece } from '../types/Pieces/Piece';
import { useRecoilValue } from 'recoil';
import { currentTurnState } from '../state';

/**
 * A UI piece component. Is draggable
 * @param piece Contains the PieceType information
 */
export default function PieceComponent({ piece }: { piece: Piece }) {
   const currentTurn = useRecoilValue(currentTurnState);

   return (
      <Draggable
         key={piece.coordinate}
         id={piece.coordinate}
         style={{
            width: '100%',
            height: '100%',
         }}
         disabled={currentTurn != piece.color}
      >
         <img
            className="unselectable"
            draggable="false"
            src={piece.image}
            style={{
               position: 'relative',
               width: '100%',
               height: '100%',
            }}
         />
      </Draggable>
   );
}
