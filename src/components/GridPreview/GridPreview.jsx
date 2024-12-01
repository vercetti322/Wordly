import './GridPreview.css';

export default function GridPreview() {
  const gridData = [
    ['P', 'L', 'A', 'Y'],
    ['S', 'T', 'A', 'R'],
    ['I', 'O', 'R', 'E'],
    ['T', 'E', 'S', 'T'],
  ];

  return (
    <div className="word-grid">
      {gridData.map((row, rowIdx) =>
        row.map((letter, colIdx) => (
          <div key={`${rowIdx}:${colIdx}`} className="cell">
            {letter}
          </div>
        ))
      )}
    </div>
  );
}
