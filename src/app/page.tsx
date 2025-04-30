'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';

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

const checkTurnColorBefore = (board: number[][]) => {
  const count = board
    .flat()
    .map((cell) => (cell === 3 ? 0 : cell))
    .filter((cell) => cell == 0).length;
  return count;
};
const checkTurnColorAfter = (board: number[][]) => {
  const count = board
    .flat()
    .map((cell) => (cell === 3 ? 0 : cell))
    .filter((cell) => cell == 0).length;
  return count;
};

const checkCanPutPosition = (board: number[][], turnColor: number) => {
  const newBoard = structuredClone(board).map((row) => row.map((cell) => (cell === 3 ? 0 : cell)));
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (newBoard[y][x] !== 0) continue;
      directions.forEach(([dy, dx]) => {
        for (let i = 1; i < 8; i++) {
          const ny = y + dy * i;
          const nx = x + dx * i;
          if (newBoard[ny] !== undefined && newBoard[ny][nx] !== 2 / turnColor) break;
          if (newBoard[ny] !== undefined && newBoard[ny][nx] === 2 / turnColor) {
            if (newBoard[ny + dy] !== undefined && newBoard[ny + dy][nx + dx] === turnColor) {
              newBoard[y][x] = 3;
            }
          }
        }
      });
    }
  }
  return newBoard;
};

const getCellClass = (cell: number) => {
  switch (cell) {
    case 1:
      return { backgroundColor: '#000' };
    case 2:
      return { backgroundColor: '#fff' };
    case 3:
      return { backgroundColor: '#fff000', width: '14px', height: '14px' };
    default:
      return {};
  }
};

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
    if (gameBoard[y][x] !== 3) return;
    console.log('a');
    const newGameBoard = structuredClone(gameBoard);
    const before = checkTurnColorBefore(newGameBoard);
    directions.forEach(([dy, dx]) => {
      console.log('b');
      for (let i = 1; i < 8; i++) {
        const ny = y + dy * i;
        const nx = x + dx * i;
        if (newGameBoard[ny] !== undefined && newGameBoard[ny][nx] !== 2 / turnColor) break;
        if (newGameBoard[ny] !== undefined && newGameBoard[ny][nx] === 2 / turnColor) {
          if (newGameBoard[ny + dy] !== undefined && newGameBoard[ny + dy][nx + dx] === turnColor) {
            for (let j = 0; j < i + 1; j++) {
              console.log('eee');
              const nny = y + dy * j;
              const nnx = x + dx * j;
              newGameBoard[nny][nnx] = turnColor;
            }
          }
        }
      }
    });

    const after = checkTurnColorAfter(newGameBoard);
    if (before > after) {
      setTurnColor(2 / turnColor);
      console.log(turnColor);
      const nextBoard = checkCanPutPosition(newGameBoard, 2 / turnColor);
      setGameBoard(nextBoard);
    }
  };

  useEffect(() => {
    console.log(turnColor);
    const result = checkCanPutPosition(gameBoard, turnColor);
    setGameBoard(result);
  }, []);

  return (
    <div className={styles.container}>
      {gameBoard.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div key={x} className={styles.cell} onClick={() => handleClick(x, y)}>
              {gameBoard[y][x] !== 0 && (
                <div className={styles.stone} style={getCellClass(cell)}></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
