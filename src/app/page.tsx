'use client';
import styles from './page.module.css';
import { useState } from 'react';

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

  const getCellStyle = (value: number) => {
    switch (value) {
      case 1:
        return { backgroundColor: 'black' };
      case 2:
        return { backgroundColor: 'white' };
      default:
        return { backgroundColor: 'green' };
    }
  };
  // const handleClick = (y: number, x: number) => {
  //   const newGameBoard = [...gameBoard];
  // };
  return (
    <div className={styles.container}>
      {gameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} style={getCellStyle(cell)} className={styles.cell}></div>
          ))}
        </div>
      ))}
    </div>
  );
}
