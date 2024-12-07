import './Home.css';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Description from '../../components/Description/Description';
import CopyRight from '../../components/CopyRight/CopyRight';
import WordGrid from '../../components/WordGrid/WordGrid';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import { demoGridJson } from '../../assets/constants';
import { useEffect, useState } from 'react';
import hasTimePassed, {
  getGridData,
  getGridStatus,
  hasDatePassed,
  makeWord,
} from '../../assets/utils';

export default function Home() {
  const [isWordFound, setIsWordFound] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [playerPresent, setPlayerPresent] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const demoGridData = getGridData(demoGridJson.grid);
  const demoGridStatus = getGridStatus(demoGridJson.grid);

  const handleSelectionUpdate = (cells) => {
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

  useEffect(() => {
    const playerData = localStorage.getItem('player');

    if (playerData !== null) {
      try {
        const parsedPlayerData = JSON.parse(playerData);

        if (
          parsedPlayerData &&
          parsedPlayerData.creationDate &&
          parsedPlayerData.creationTime
        ) {
          setPlayerPresent(true);
          setPlayerName(parsedPlayerData.name);

          let creationDate = parsedPlayerData.creationDate;
          let creationTime = parsedPlayerData.creationTime;

          if (hasDatePassed(creationDate) || hasTimePassed(creationTime)) {
            localStorage.removeItem('player');
            setPlayerPresent(false);
          }
        }
      } catch (error) {
        console.error('Error parsing player data from localStorage:', error);
        setPlayerPresent(false);
      }
    } else {
      setPlayerPresent(false);
    }
  }, []);

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
      {!playerPresent && (
        <Button handleClick={openRegisterModal} text={'New Game'} />
      )}
      {playerPresent && <p className="queue-hint">{playerName}, you are in queue!</p>}
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
