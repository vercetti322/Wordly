/* eslint-disable react/prop-types */
import { useGridSelection } from '../../hooks/useGridSelection';
import './WordGrid.css';
import { useEffect } from 'react';

export default function WordGrid({
  letterData,
  statusData,
  onSelectionUpdate,
  resetTrigger,
}) {
  const columns = letterData[0].length;
  const rows = letterData.length;

  const {
    selectedCells,
    startSelection,
    updateSelection,
    endSelection,
    resetSelection,
  } = useGridSelection(letterData.length, letterData[0].length);

  useEffect(() => {
    onSelectionUpdate(selectedCells);
  }, [selectedCells, onSelectionUpdate]);

  useEffect(() => {
    resetSelection();
  }, [resetSelection, resetTrigger]);

  return (
    <div
      className="word-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {letterData.map((row, rowIdx) =>
        row.map((letter, colIdx) => {
          const isSelected = selectedCells.some(
            (cell) => cell.x === colIdx && cell.y === rowIdx
          );
          return (
            <div
              style={{
                backgroundColor: isSelected ? 'var(--yellow)' : null,
                borderRight: colIdx === columns - 1 ? 'none' : null,
                borderBottom: rowIdx === rows - 1 ? 'none' : null,
                color: statusData[rowIdx][colIdx] === 0 ? 'gray' : '#333',
                pointerEvents: statusData[rowIdx][colIdx] === 0 ? 'none' : null,
                cursor: statusData[rowIdx][colIdx] === 0 ? 'none' : 'pointer',
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
