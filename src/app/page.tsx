'use client';
import styles from './page.module.css';
import { useState } from 'react';

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export default function Home() {
  const [gameBoard, setGameBoard] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [turnColor, setTurnColor] = useState(1);

  const handleClick = (x: number, y: number) => {
    // console.log(`Clicked cell at (${x}, ${y})`);
    const newGameBoard = structuredClone(gameBoard);
    if (newGameBoard[y][x] !== 0) return;
    directions.forEach(([dy, dx]) => {
      for (let i = 1; i < 8; i++) {
        const ny = y + dy * i;
        const nx = x + dx * i;
        if (newGameBoard[ny] !== undefined && newGameBoard[ny][nx] === 0) break;
        if (newGameBoard[ny] !== undefined && newGameBoard[ny][nx] === 2 / turnColor) {
          if (newGameBoard[ny + dy] !== undefined && newGameBoard[ny + dy][nx + dx] === turnColor) {
            for (let j = 0; j < i + 1; j++) {
              const nny = y + dy * j;
              const nnx = x + dx * j;
              newGameBoard[nny][nnx] = turnColor;
            }
          }
        }
      }
    });
    setGameBoard(newGameBoard);
    setTurnColor(2 / turnColor);
  };

  return (
    <div className={styles.container}>
      {gameBoard.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div key={x} className={styles.cell} onClick={() => handleClick(x, y)}>
              {gameBoard[y][x] !== 0 && (
                <div
                  className={styles.stone}
                  style={{ backgroundColor: cell === 1 ? '#000' : '#fff' }}
                ></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
