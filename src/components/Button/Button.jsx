/* eslint-disable react/prop-types */
import './Button.css';

export default function Button({ text, handleClick }) {
  return (
    <button className='special-button' onClick={handleClick}>
      {text}
    </button>
  );
}
