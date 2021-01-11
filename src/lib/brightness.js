export const increaseBrightness = (data, min, max) =>
  data.map((el, index) => (index % 4 !== 3 ? el - (max - min) : el));

export const decreaseBrightness = (data, min, max) =>
  data.map((el, index) => (index % 4 !== 3 ? el + (max - min) : el));
