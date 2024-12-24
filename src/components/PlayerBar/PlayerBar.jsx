/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './PlayerBar.css';
import WsContext from '../../context/WsContext';

export default function PlayerBar({ game }) {
  const { playerId } = useContext(WsContext);
  const otherPlayerId = Object.values(game.players)
    .filter((player) => player.playerId !== playerId)
    .map((player) => player.playerId);
  return (
    <div className='bar'>
      <div className="player-bar">
        <div
          className="player"
          style={{ backgroundColor: `${game.playerColors[playerId]}` }}
        >
          You
        </div>
        <div
          className="player"
          style={{ backgroundColor: `${game.playerColors[otherPlayerId]}` }}
        >
          {game.players[otherPlayerId].name}
        </div>
      </div>
      <div className="score-bar">
        <div
          className="score"
        >
          {game.playerScores[playerId]}
        </div>
        <div
          className="score"
        >
          {game.playerScores[otherPlayerId]}
        </div>
      </div>
    </div>
  );
}
