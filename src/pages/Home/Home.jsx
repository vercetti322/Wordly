import './Home.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Description from '../../components/Description/Description';
import CopyRight from '../../components/CopyRight/CopyRight';
import WordGrid from '../../components/WordGrid/WordGrid';
import { demoGridData } from '../../assets/constants';
import { useState } from 'react';
import { makeWord } from '../../assets/utils';

export default function Home() {
  const [isWordFound, setIsWordFound] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);

  const handleSelectionUpdate = (cells) => {
    setSelectedCells(cells);
    const word = makeWord(selectedCells, demoGridData);
    if (word === 'STARLINK') {
      setIsWordFound(true);
    } else {
      setIsWordFound(false);
    }
  };

  return (
    <div className="home">
      <Header text={'Wordly'} />
      <Description>
        Ready to challenge a random opponent in a fast-paced 15-minute showdown?
        Jump into the queue, unleash your competitive spirit, and may the best
        player win, no hassle, just pure fun!
      </Description>
      {!isWordFound && (
        <WordGrid
          onSelectionUpdate={handleSelectionUpdate}
          gridData={demoGridData}
        />
      )}
      {isWordFound && (
        <>
          <img
            className="starlink-meme"
            src="src\assets\images\starlink-meme.jpg"
            alt="starlink-meme"
          />
          <p className="play-hint">Click on &quot;New Game&quot; fast!!!</p>
        </>
      )}
      <div className="home-buttons">
        <Button
          handleClick={() => console.log('New Button clicked')}
          text={'New Game'}
        />
      </div>
      {!isWordFound && (
        <p className="home-hint">
          Select &apos;STARLINK&apos; using mouse from the above grid!
        </p>
      )}
      <CopyRight />
    </div>
  );
}
