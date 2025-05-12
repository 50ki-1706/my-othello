import { directions } from './constants';
export const putStone = (
  board: number[][],
  turnColor: number,
  x: number,
  y: number
): [number[][], boolean] => {
  let canPut = false;
  directions.forEach(([dy, dx]) => {
    for (let i = 1; i < 8; i++) {
      const ny = y + dy * i;
      const nx = x + dx * i;
      if (board[ny] !== undefined && board[ny][nx] !== 2 / turnColor) break;
      if (board[ny] !== undefined && board[ny][nx] === 2 / turnColor) {
        if (board[ny + dy] !== undefined && board[ny + dy][nx + dx] === turnColor) {
          canPut = true;
          for (let j = 0; j < i + 1; j++) {
            const nny = y + dy * j;
            const nnx = x + dx * j;
            board[nny][nnx] = turnColor;
          }
        }
      }
    }
  });
  return [board, canPut];
};
