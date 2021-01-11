const colors = [100, 150, 200, 0];

export const pseudocoloring = (
  data,
  firstBorder,
  secondBorder,
  thirdBorder
) => {
  return data.map((el, index) => {
    if (index % 4 !== 3) {
      if (el <= firstBorder) {
        return colors[0];
      } else if (el <= secondBorder) {
        return colors[1];
      } else if (el <= thirdBorder) {
        return colors[2];
      } else {
        return colors[3];
      }
    }
  });
};
