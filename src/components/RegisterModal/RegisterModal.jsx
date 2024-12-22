/* eslint-disable no-unused-vars */
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import './RegisterModal.css';
import { useState } from 'react';

export default function RegisterModal({ setModalOpen }) {
  const [name, setName] = useState('');

  const registerPlayer = () => {
    setModalOpen(false);
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="register-modal">
        <h3 className="nick">Provide your nickname</h3>
        <p className="hint">You will be placed in a lobby of online players!</p>
        <input
          onChange={(e) => setName(e.target.value)}
          className="input"
          type="text"
        />
        <div className="button-group">
          <Button text={'Register'} handleClick={registerPlayer} />
          <Button text={'Cancel'} handleClick={() => setModalOpen(false)} />
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
}
