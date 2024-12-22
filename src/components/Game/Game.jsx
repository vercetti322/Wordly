/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './Game.css';
import Header from '../Header/Header';
import WordGrid from '../WordGrid/WordGrid';
import { demoGridJson } from '../../assets/constants';
import Button from '../Button/Button';
import { makeWord, getGridData, getGridStatus } from '../../assets/utils';
import { useState } from 'react';

export default function Game({ id }) {
  const demoGridData = getGridData(demoGridJson.grid);
  const demoGridStatus = getGridStatus(demoGridJson.grid);
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

    setSelectedCells([]);
    setResetTrigger((prev) => prev + 1);
    // submit the word to backend here...
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
      <Header text={`#${id}`} />
      <WordGrid
        letterData={demoGridData}
        onSelectionUpdate={handleSelectionUpdate}
        resetTrigger={resetTrigger}
        statusData={demoGridStatus}
      />
      <input readOnly className="word-output" type="text" value={word} />
      <div className="button-group">
        <Button handleClick={handleSubmit} text={'Submit Word'} />
        <Button handleClick={handleClear} text={'Clear Selection'} />
      </div>
    </div>
  );
}
