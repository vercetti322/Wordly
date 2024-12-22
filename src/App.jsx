/* eslint-disable no-unused-vars */
import Game from './components/Game/Game';
import Home from './components/Home/Home';
import { useState } from 'react';

export default function App() {
  const [gameSession, isGameSession] = useState(false);

  return <>{gameSession ? <Game id={1001} /> : <Home />}</>;
}
