/* eslint-disable no-unused-vars */
import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import WordGrid from '../../components/WordGrid/WordGrid';
import { demoGridData } from '../../assets/constants';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import './Game.css';
import { makeWord } from '../../assets/utils';

export default function Game() {
  const { id } = useParams();

  const [selectedCells, setSelectedCells] = useState([]);

  const [resetTrigger, setResetTrigger] = useState(0);

  const [word, setWord] = useState('');

  // validate the id
  const isValid = /^[1-9]\d{3}$/;

  if (!isValid.test(id)) {
    return <Navigate to="/error" />;
  }

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
  };

  return (
    <div className="game">
      <Header text={`#${id}`} />
      <WordGrid
        gridData={demoGridData}
        onSelectionUpdate={handleSelectionUpdate}
        resetTrigger={resetTrigger}
      />
      <input readOnly className="word-output" type="text" value={word} />
      <div className="button-group">
        <Button handleClick={handleSubmit} text={'Submit Word'} />
        <Button handleClick={handleSubmit} text={'Clear Selection'} />
      </div>
    </div>
  );
}
