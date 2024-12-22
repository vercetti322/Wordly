// Function to get word from selected cells
export const makeWord = (selectedCells, gridData) => {
    return selectedCells
        .map((cell) => gridData[cell.y][cell.x])
        .join('');
}

// Function to extract letter data from grid JSON
export const getGridData = (grid) => {
    return grid.map(row => row.map(cell => cell.letter));
};

// Function to extract status data from grid JSON
export const getGridStatus = (grid) => {
    return grid.map(row => row.map(cell => cell.status));
};
