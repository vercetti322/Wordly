import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import Error from './pages/Error/Error';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<Error />} />
      <Route path="/:id" element={<Game />} />
    </Routes>
  );
}
