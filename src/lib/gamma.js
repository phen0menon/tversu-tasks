export const calculateGamma = (data, val) => {
  return data.map((el, index) =>
    index % 4 !== 3 ? parseInt(255 * Math.pow(el / 255, val), 10) : el
  );
};
