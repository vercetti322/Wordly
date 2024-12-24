import Game from './components/Game/Game';
import Home from './components/Home/Home';
import useWebSockets from './hooks/useWebSockets';
import WsContext from './context/WsContext';

export default function App() {
  const { registered, game, register, stompClient, playerCount, playerId } =
    useWebSockets();
  return (
    <WsContext.Provider
      value={{
        registered,
        register,
        stompClient,
        playerCount,
        game,
        playerId,
      }}
    >
      {game ? <Game game={game} /> : <Home />}
    </WsContext.Provider>
  );
}
