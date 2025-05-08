export const getCellStyle = (cell: number) => {
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
