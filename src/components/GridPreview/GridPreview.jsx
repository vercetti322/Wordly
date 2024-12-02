import { useEffect } from 'react';
import { useGridSelection } from '../../hooks/useGridSelection';
import './GridPreview.css';

export default function GridPreview() {
  // Define the grid data
  const gridData = [
    ['P', 'L', 'A', 'Y'],
    ['S', 'T', 'A', 'R'],
    ['I', 'O', 'R', 'E'],
    ['T', 'E', 'S', 'T'],
  ];

  const {
    selectedCells,
    setSelectedCells,
    startSelection,
    updateSelection,
    endSelection,
  } = useGridSelection(gridData.length, gridData[0].length);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleEnter();
      }
    };

    const handleEnter = () => {
      console.log('selection dispatched: ', selectedCells);
      setSelectedCells([]);
    };

    // Add the event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCells, setSelectedCells]);

  return (
    <div className="word-grid">
      {gridData.map((row, rowIdx) =>
        row.map((letter, colIdx) => {
          const isSelected = selectedCells.some(
            (cell) => cell.x === colIdx && cell.y === rowIdx
          );
          return (
            <div
              style={{
                backgroundColor: isSelected ? 'var(--yellow)' : null,
              }}
              onMouseDown={() => startSelection(rowIdx, colIdx)}
              onMouseMove={() => updateSelection(rowIdx, colIdx)}
              onMouseUp={endSelection}
              key={`${rowIdx}:${colIdx}`}
              className="cell"
            >
              {letter}
            </div>
          );
        })
      )}
    </div>
  );
}
