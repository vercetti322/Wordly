/* eslint-disable react/prop-types */
import { useGridSelection } from '../../hooks/useGridSelection';
import './WordGrid.css';
import { useEffect } from 'react';

export default function WordGrid({ gridData, onSelectionUpdate }) {
  // Define the grid data
  const columns = gridData[0].length;
  const rows = gridData.length;

  const { selectedCells, startSelection, updateSelection, endSelection } =
    useGridSelection(gridData.length, gridData[0].length);

  useEffect(() => {
    onSelectionUpdate(selectedCells);
  }, [selectedCells, onSelectionUpdate]);

  return (
    <div
      className="word-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {gridData.map((row, rowIdx) =>
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
