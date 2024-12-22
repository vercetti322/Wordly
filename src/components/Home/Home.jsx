import './Home.css';
import Header from '../Header/Header';
import { useState } from 'react';
import Button from '../Button/Button';

export default function Home() {
  const [name, setName] = useState('');
  return (
    <div className="home">
      <Header text={'Wordly'} />
      <p className="description">
        Ready to challenge a random opponent in a fast-paced 15-minute showdown
        of crossword? Jump into the queue, unleash your competitive spirit, and
        may the best player win, no hassle, just pure fun!
      </p>
      <p className="nick">Enter your nick below!</p>
      <input
        onChange={(e) => setName(e.target.value)}
        className="input"
        type="text"
      />
      <Button
        handleClick={() => console.log(`${name} player registered`)}
        text={'Register'}
      />
      <p className="copyright">
        © 2024 Wordly. Released under the MIT License.
      </p>
    </div>
  );
}
