'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { getCellStyle } from './utils/getCellStyle';
import { putStone } from './lib/putStone';
import { markValidMoves } from './lib/markValidMoves';
import { Board } from './lib/constants';
import { checkCount } from './utils/checkCount';

export default function Home() {
  const [board, setBoard] = useState<{ board: number[][]; color: number }>({
    board: Board,
    color: 1,
  });
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) return;
    const counts = checkCount(markValidMoves(board.board, board.color));
    if (counts.moves === 0) {
      setBoard((prev) => ({
        ...prev,
        color: 2 / prev.color,
      }));
      const newCounts = checkCount(markValidMoves(board.board, 2 / board.color));
      if (newCounts.moves === 0) {
        setIsGameOver(true);
        alert(`Game Over! Black: ${counts.black}, White: ${counts.white}`);
        return;
      }
      alert('Pass!');
    }
  }, [board, isGameOver]);

  const handleClick = (x: number, y: number) => {
    if (isGameOver) return;
    const newBoard: number[][] = structuredClone(board.board);
    if (newBoard[y][x] !== 0) return;
    const [result, canPut] = putStone(newBoard, board.color, x, y);
    if (!canPut) return;
    setBoard({ board: result, color: 2 / board.color });
  };
  return (
    <div className={styles.container}>
      {markValidMoves(board.board, board.color).map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((cell, x) => (
            <div key={x} className={styles.cell} onClick={() => handleClick(x, y)}>
              {cell !== 0 && <div className={styles.stone} style={getCellStyle(cell)}></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
