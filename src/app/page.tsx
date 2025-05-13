'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { getCellStyle } from './utils/getCellStyle';
import { putStone } from './lib/putStone';
import { markValidMoves } from './lib/markValidMoves';
import { Board } from './lib/constants';
import { checkCount } from './utils/checkCount';

export default function Home() {
  const [board, setBoard] = useState<number[][]>(Board);
  const [turnColor, setTurnColor] = useState(1);

  useEffect(() => {
    const counts = checkCount(markValidMoves(board, turnColor));
    if (counts.empty === 0 && counts.moves === 0) {
      alert(`Game Over! Black: ${counts.black}, White: ${counts.white}`);
    }
  }, [board, turnColor]);

  const handleClick = (x: number, y: number) => {
    const newBoard: number[][] = structuredClone(board);
    const [result, canPut] = putStone(newBoard, turnColor, x, y);
    if (!canPut) return;
    setTurnColor(2 / turnColor);
    setBoard(result);
  };
  return (
    <div className={styles.container}>
      {markValidMoves(board, turnColor).map((row, y) => (
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
