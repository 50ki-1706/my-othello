import { directions } from './constants';
export const markValidMoves = (board: number[][], turnColor: number): number[][] => {
  const newBoard = structuredClone(board);
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
