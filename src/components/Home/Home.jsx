import './Home.css';
import Header from '../Header/Header';
import { useContext, useState } from 'react';
import Button from '../Button/Button';
import WsContext from '../../context/WsContext';

export default function Home() {
  const [name, setName] = useState('');
  const { register, registered, playerId, playerCount } = useContext(WsContext);

  const handleRegister = () => {
    if (name.trim() == '') {
      alert('Pls enter a valid nick!');
      return;
    }
    register(name);
  };

  return (
    <div className="home">
      <Header text={'Wordly'} />
      <p className="description">
        Ready to challenge a random opponent in a fast-paced 15-minute showdown
        of crossword? Jump into the queue, unleash your competitive spirit, and
        may the best player win, no hassle, just pure fun!
      </p>
      {!registered ? (
        <>
          <p className="nick">Enter your nick below!</p>
          <input
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
          />
          <Button handleClick={handleRegister} text={'Register'} />
        </>
      ) : (
        <>
          <p>
            {playerCount} {playerCount == 1 ? 'player is' : 'players are'}{' '}
            online, wait for a while.... Your id is {playerId}
          </p>
          {/* <Button handleClick={enterGame} text={'Enter Game'} /> */}
        </>
      )}
      <p className="copyright">
        © 2024 Wordly. Released under the MIT License.
      </p>
    </div>
  );
}
