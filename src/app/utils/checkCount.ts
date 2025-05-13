export const checkCount = (
  board: number[][]
): { black: number; white: number; moves: number; empty: number } => {
  const blackCount = board.flat().filter((cell) => cell === 1).length;
  const whiteCount = board.flat().filter((cell) => cell === 2).length;
  const canMovesCount = board.flat().filter((cell) => cell === 3).length;
  const emptyCount = board.flat().filter((cell) => cell === 0).length;
  return { black: blackCount, white: whiteCount, moves: canMovesCount, empty: emptyCount };
};
