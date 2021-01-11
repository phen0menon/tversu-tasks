import { product, fillArray } from '../helpers/itertools';
import {
  calcCanvasIndex,
  getColumnByIndex,
  getRowByIndex
} from '../helpers/canvas';
import { flatten } from '../helpers/array';

/**
 * Calculates the value of single pixel with kernel applied
 */
export function calculatePixelConvolution(data, kernel) {
  if (data.length !== kernel.length) {
    throw Error('Data and kernel should have same length');
  }

  const rank = Math.floor(Math.sqrt(kernel.length));
  if (rank * rank !== kernel.length) {
    throw Error('Convolution kernel should have square size');
  }

  if (rank % 2 === 0) {
    throw Error('Kernel size should be odd');
  }

  return data.reduce(
    (accumulator, currentValue, index) =>
      accumulator + currentValue * kernel[index],
    0
  );
}

/**
 * Slices pixels around given pixel, if there are no pixels (border),
 * duplicates with border values
 */
export function slicePixels(
  data,
  width,
  height,
  row,
  column,
  offsets,
  channel = 0
) {
  const result = [];

  for (const offset of offsets) {
    let x = column + offset[1];
    let y = row + offset[0];

    if (x < 0) {
      x = 0;
    } else if (x >= width) {
      x = width - 1;
    }

    if (y < 0) {
      y = 0;
    } else if (y >= height) {
      y = height - 1;
    }

    const index = calcCanvasIndex(x, y, width) + channel;
    result.push(data[index]);
  }

  return result;
}

/**
 * Applies convolution filter with given transformation function
 */
export function applyConvolutionFilter(data, width, height, transformation) {
  const result = new Uint8ClampedArray(width * height * 4);

  for (let i = 0; i < data.length; i += 4) {
    const row = getRowByIndex(i, width);
    const column = getColumnByIndex(i, width);
    const pixel = transformation(data, width, height, {
      index: i,
      element: data[i],
      row,
      column
    });

    result[i] = pixel;
    result[i + 1] = pixel;
    result[i + 2] = pixel;
    result[i + 3] = 255;
  }

  return result;
}

/**
 * Applies matrix convolution filter with given kernel and coefficient
 */
export const applyMatrixFilter = (data, width, height, kernel, k) => {
  kernel = flatten(kernel);
  const absOffset = Math.floor(Math.sqrt(kernel.length) / 2);
  const oneDimensionalOffsets = fillArray(-absOffset, absOffset);
  const offsets = product(oneDimensionalOffsets, oneDimensionalOffsets);

  return applyConvolutionFilter(
    data,
    width,
    height,
    (data, width, height, { index, row, column }) => {
      const neighbourhood = slicePixels(
        data,
        width,
        height,
        row,
        column,
        offsets
      );
      return (1 / k) * calculatePixelConvolution(neighbourhood, kernel);
    }
  );
};

/**
 * Applies convolution filter with given transformation fuction
 */
export function applyFunctionalFilter(
  data,
  width,
  height,
  sliceSize,
  transformation
) {
  const absOffset = Math.floor(Math.sqrt(sliceSize) / 2);
  const oneDimensionalOffsets = fillArray(-absOffset, absOffset);
  const offsets = product(oneDimensionalOffsets, oneDimensionalOffsets);

  return applyConvolutionFilter(
    data,
    width,
    height,
    (data, width, height, { index, row, column }) => {
      const neighbourhood = slicePixels(
        data,
        width,
        height,
        row,
        column,
        offsets
      );
      return transformation(neighbourhood);
    }
  );
}

export const applyBlurFilter = (data, width, height, k) =>
  applyMatrixFilter(data, width, height, [[1, 1, 1], [1, 1, 1], [1, 1, 1]], k);

export const applyMedianFilter = (data, width, height, radius = 9) =>
  applyFunctionalFilter(data, width, height, radius, pixels => {
    const center = Math.ceil(radius / 2);
    return pixels.sort()[center];
  });
