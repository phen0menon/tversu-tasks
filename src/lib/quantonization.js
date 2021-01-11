import { grayscalePixel } from './grayscalePixel';

export const calculateQuantonization = (data, val) => {
  const partitions = parseInt(256 / val, 10);

  let lastValue = 0;
  let iterations = 0;

  return data.map((el, index) => {
    if (iterations > 0) {
      iterations--;
      return lastValue;
    }

    if (index % 4 !== 3) {
      const grayscaled = grayscalePixel([
        data[index],
        data[index + 1],
        data[index + 2]
      ]);

      let counter = 0;
      while (counter <= 256) {
        if (grayscaled <= counter) {
          lastValue = counter;
          iterations = 2;
          return lastValue;
        } else {
          counter += partitions;
        }
      }
    }
    return el;
  });
};
