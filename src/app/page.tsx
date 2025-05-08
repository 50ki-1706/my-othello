'use client';

import styles from './page.module.css';
import { useState } from 'react';
import { getCellStyle } from './utils/getCellStyle';
import { putStone } from './lib/putStone';
import { markValidMoves } from './lib/markValidMoves';

export default function Home() {
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [turnColor, setTurnColor] = useState(1);

  const handleClick = (x: number, y: number) => {
    if (board[y][x] !== 3) return;
    const newGameBoard = structuredClone(board);
    const result = putStone(newGameBoard, turnColor, x, y);
    setTurnColor(2 / turnColor);
    console.log(turnColor);
    const nextBoard = markValidMoves(result, 2 / turnColor);
    setBoard(nextBoard);
  };

  return (
    <div className={styles.container}>
      {board.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div key={x} className={styles.cell} onClick={() => handleClick(x, y)}>
              {board[y][x] !== 0 && <div className={styles.stone} style={getCellStyle(cell)}></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
