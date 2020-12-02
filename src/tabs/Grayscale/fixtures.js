export const initialState = {
  red: 0,
  green: 0,
  blue: 0,
};

export const keys = Object.keys(initialState);

export function normalize(value, ...elements) {
  return value / elements.reduce((res, curr) => res + curr, 0);
}
