import Chessboard from '../Components/Chessboard';
import { useRecoilValue } from 'recoil';
import { currentTurnState } from '../state';
import { Color } from '../types/Color';
import { ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';

export default function Game() {
   const currentTurn = useRecoilValue(currentTurnState);

   return (
      <div className="d-flex flex-column align-items-center gap-3">
         {currentTurn == Color.WHITE ? (
            <h1>White's Turn</h1>
         ) : (
            <h1>Blacks's Turn</h1>
         )}
         <Chessboard />
         <div className="d-flex gap-3">
            <ToggleButtonGroup
               color="secondary"
               size="large"
               exclusive
               aria-label="Platform"
            >
               <ToggleButton value="web">Local</ToggleButton>
               <ToggleButton value="android">ChessBot</ToggleButton>
               <ToggleButton value="ios">Remote</ToggleButton>
            </ToggleButtonGroup>

            <IconButton aria-label="delete" size="large" color="secondary">
               <SwapVertIcon fontSize="inherit" />
            </IconButton>
         </div>
      </div>
   );
}
