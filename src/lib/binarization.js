export const calculateBinarization = (data, val) => {
  return data.map((el, index) =>
    index % 4 !== 3 ? (data[index] < val ? 0 : 255) : el
  );
};
