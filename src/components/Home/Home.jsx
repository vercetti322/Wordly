import './Home.css';
import Header from '../Header/Header';
import Description from '../Description/Description';
import WordGrid from '../WordGrid/WordGrid';
import { demoGridJson } from '../../assets/constants';
import { useState } from 'react';
import Button from '../Button/Button';
import CopyRight from '../CopyRight/CopyRight';
import RegisterModal from '../RegisterModal/RegisterModal';
import { makeWord, getGridData, getGridStatus } from '../../assets/utils';

export default function Home() {
  const [isWordFound, setIsWordFound] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const demoGridData = getGridData(demoGridJson.grid);
  const demoGridStatus = getGridStatus(demoGridJson.grid);

  const handleSelectionDemo = (cells) => {
    setSelectedCells(cells);
    const word = makeWord(selectedCells, demoGridData);
    if (word === 'STARLINK') {
      setIsWordFound(true);
    } else {
      setIsWordFound(false);
    }
  };
  const openRegisterModal = () => {
    setModalOpen(true);
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
          onSelectionUpdate={handleSelectionDemo}
          letterData={demoGridData}
          statusData={demoGridStatus}
        />
      )}
      {isWordFound && (
        <>
          <img
            className="starlink-meme"
            src="src\assets\images\starlink-meme.jpg"
            alt="starlink-meme"
          />
        </>
      )}
      <Button handleClick={openRegisterModal} text={'New Game'} />
      {modalOpen && <RegisterModal setModalOpen={setModalOpen} />}
      {!isWordFound && (
        <p className="home-hint">
          Select &apos;STARLINK&apos; using mouse from the above grid!
        </p>
      )}
      <CopyRight />
    </div>
  );
}
