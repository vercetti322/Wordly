export const makeWord = (selectedCells, gridData) => {
    return selectedCells
        .map((cell) => gridData[cell.y][cell.x])
        .join('');
}
