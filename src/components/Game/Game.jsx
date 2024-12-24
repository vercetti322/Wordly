/* eslint-disable react/prop-types */
import './Game.css';
import Header from '../Header/Header';
import WordGrid from '../WordGrid/WordGrid';
import Button from '../Button/Button';
import { makeWord, getGridData, getGridStatus } from '../../assets/utils';
import { useContext, useState } from 'react';
import WsContext from '../../context/WsContext';
import PlayerBar from '../PlayerBar/PlayerBar';

export default function Game({ game }) {
  const { stompClient, playerId } = useContext(WsContext);
  const demoGridData = getGridData(game.grid);
  const demoGridStatus = getGridStatus(game.grid);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedCells, setSelectedCells] = useState([]);
  const [word, setWord] = useState('');

  const handleSelectionUpdate = (cells) => {
    setSelectedCells(cells);
    setWord(makeWord(cells, demoGridData));
  };

  const handleSubmit = () => {
    if (word.trim() === '') {
      alert('Please select a word!');
      return;
    }

    // submit the word to backend here...
    console.log({
      text: word,
      selection: selectedCells,
      playerId: playerId,
    });

    stompClient.send(
      '/game-api/submit-word',
      {},
      JSON.stringify({
        text: word,
        selection: selectedCells,
        playerId: playerId,
      })
    );

    setSelectedCells([]);
    setResetTrigger((prev) => prev + 1);
  };

  const handleClear = () => {
    if (word.trim() === '') {
      alert('Please select a word!');
      return;
    }

    setSelectedCells([]);
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="game">
      <Header text={`#${game.gameId}`} />
      <div className="header-bars">
        <PlayerBar game={game} />
        <input readOnly className="word-output" type="text" value={word} />
      </div>
      <WordGrid
        letterData={demoGridData}
        onSelectionUpdate={handleSelectionUpdate}
        resetTrigger={resetTrigger}
        statusData={demoGridStatus}
      />
      <div className="button-group">
        <Button handleClick={handleSubmit} text={'Submit Word'} />
        <Button handleClick={handleClear} text={'Clear Selection'} />
      </div>
    </div>
  );
}
