import './DemoModal.css';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';

export default function DemoModal({ open, onClose }) {
  return (
    open &&
    createPortal(
      <div className="modal-overlay">
        <div className="demo-modal">
          Demo Modal
          <Button handleClick={onClose} text={'Close'} />
        </div>
      </div>,
      document.getElementById('portal')
    )
  );
}
