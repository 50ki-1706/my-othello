export const countValidMoves = (board: number[][]): number => {
  const count = board.flat().filter((cell) => cell === 3).length;
  return count;
};
