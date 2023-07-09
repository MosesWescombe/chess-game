import { RecoilRoot } from 'recoil';
import Game from './Pages/Game';

function App() {
   return (
      <RecoilRoot>
         <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: '100vw', height: '100vh' }}
         >
            <Game />
         </div>
      </RecoilRoot>
   );
}

export default App;
