export const grayscalePixel = pixel => {
  return Math.ceil(pixel[0] * 0.299 + pixel[1] * 0.587 + pixel[2] * 0.114);
};
