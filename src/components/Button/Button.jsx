/* eslint-disable react/prop-types */
import './Button.css';

export default function Button({ text, handleClick }) {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
}
