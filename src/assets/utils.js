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

/**
 * compare given date with current date
 * @param {string} givenDate - the date in dd-MM-yyy format
 * @returns {boolean} - returns if 'given date has passed'.
 */
export function hasDatePassed(givenDate) {
    const now = new Date();
    const [day, month, year] = givenDate.split('-').map(Number);

    const givenDateObject = new Date(year, month - 1, day);

    if (givenDateObject < now) {
        return false;
    }

    return true;
}

/**
 * compare given time with current time
 * @param {string} givenTime - the time in HH:mm format
 * @returns {boolean} - returns if 'given time has elapsed by 15 minutes'
 */
export default function hasTimePassed(givenTime) {
    const now = new Date();
    const [hours, minutes] = givenTime.split(':').map(Number);

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const givenTimeMinutes = hours * 60 + minutes;

    if (currentMinutes - givenTimeMinutes < 5) {
        return false;
    }

    return true;
}

