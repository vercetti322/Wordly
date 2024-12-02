import { useEffect, useState } from 'react';

export default function WordGrid() {
  const [focusedSquare, setFocusedSquare] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setFocusedSquare((prev) => (prev < 2 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setFocusedSquare((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* First Square */}
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: focusedSquare === 0 ? 'yellow' : 'gray',
        }}
      ></div>

      {/* Second Square */}
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: focusedSquare === 1 ? 'yellow' : 'gray',
        }}
      ></div>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: focusedSquare === 2 ? 'yellow' : 'gray',
        }}
      ></div>
    </div>
  );
}
