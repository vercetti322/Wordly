import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import './RegisterModal.css';
import { useState } from 'react';

export default function RegisterModal({ setModalOpen }) {
  const [name, setName] = useState('');

  const handleRegister = async () => {
    if (localStorage.getItem('player') === null && name !== '') {
      try {
        const playerJson = await fetch('http://localhost:8080/player/new', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'text/plain',
          },
          body: name,
        });

        if (!playerJson.ok) {
          throw new Error('Network response was not ok');
        }

        const playerData = await playerJson.json();
        localStorage.setItem('player', JSON.stringify(playerData));
        setModalOpen(false);
      } catch (err) {
        console.log('Error fetching player-id: ', err);
        setModalOpen(false);
      }
    } else if (name === '') {
      alert('Pls fill your name in the input field!');
      return;
    } else {
      console.log('You are already in queue!');
      setModalOpen(false);
    }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="register-modal">
        <h3 className="nick">Provide your nickname</h3>
        <p className="hint">You will be place in a lobby of online players!</p>
        <input
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
        />
        <div className="button-group">
          <Button text={'Register'} handleClick={handleRegister} />
          <Button text={'Cancel'} handleClick={() => setModalOpen(false)} />
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
}
