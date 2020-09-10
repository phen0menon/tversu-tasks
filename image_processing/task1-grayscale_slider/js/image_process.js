const imageLoader = document.getElementById("imageLoader");
imageLoader.addEventListener("change", handleImage, false);
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

const imageProcessState = {
  imageData: undefined,
  originalPixels: [],
};

const correctImageResolution = (resolution) => {
  let result = resolution;
  while (result > 300) {
    result *= 0.75;
  }
  return result;
};

function handleImage(e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      imageProcessState.imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      imageProcessState.originalPixels = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
    };

    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

function normalize(value, ...elements) {
  return value / elements.reduce((res, curr) => res + curr, 0);
}

function grayscaleProcess({ red, green, blue }) {
  const rWeight = normalize(red, red, green, blue);
  const gWeight = normalize(green, red, green, blue);
  const bWeight = normalize(blue, red, green, blue);

  const { originalPixels } = imageProcessState;
  const imageData = imageProcessState.imageData;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const intensity = Math.min(
      rWeight * originalPixels[i] +
        gWeight * originalPixels[i + 1] +
        bWeight * originalPixels[i + 2],
      255
    );

    imageData.data[i] = intensity;
    imageData.data[i + 1] = intensity;
    imageData.data[i + 2] = intensity;
  }

  ctx.putImageData(imageProcessState.imageData, 0, 0);
}
