/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";

export function useGridSelection(gridRows, gridCols) {
    const [mouseDown, setMouseDown] = useState(false);
    const [startCell, setStartCell] = useState(null);
    const [endCell, setEndCell] = useState(null);
    const [selectedCells, setSelectedCells] = useState([]);

    const startSelection = useCallback((row, col) => {
        const cell = { x: col, y: row };
        setMouseDown(true);
        setStartCell(cell);
        setEndCell(cell);
        setSelectedCells([cell]);
    }, []);

    const updateSelection = useCallback((row, col) => {
        if (!mouseDown) return;
        const cell = { x: col, y: row };
        setEndCell(cell);

        // calculate range
        const newRange = [];
        const startX = startCell.x;
        const endX = cell.x;
        const startY = startCell.y;
        const endY = cell.y;

        if (startY < endY && startX == endX) {
            for (let i = startY; i <= endY; i++) {
                newRange.push({ x: startX, y: i });
            }
        } else if (startY > endY && startX == endX) {
            for (let i = startY; i >= endY; i--) {
                newRange.push({ x: startX, y: i });
            }
        } else if (startX < endX && startY == endY) {
            for (let i = startX; i <= endX; i++) {
                newRange.push({ x: i, y: startY });
            }
        } else if (startX > endX && startY == endY) {
            for (let i = startX; i >= endX; i--) {
                newRange.push({ x: i, y: startY });
            }
        }

        setSelectedCells(newRange);
    }, [mouseDown, startCell]);

    const endSelection = useCallback(() => {
        setMouseDown(false);
    }, []);

    return {
        selectedCells,
        mouseDown,
        startSelection,
        updateSelection,
        endSelection,
        setSelectedCells
    };
}