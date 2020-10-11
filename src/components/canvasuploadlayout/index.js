import { h } from "preact";
import { useContext, useRef } from "preact/hooks";
import { AppContext } from "../app";

const getImageRatio = (canvas) => {
  const { width, height } = canvas;
  const ratio = width / height;
  return ratio;
};

const correctImageRatio = (image) => {
  const widthDefaultThreshold = 800;
  const heightDefaultThreshold = 600;

  let { width, height } = image;

  while (width > widthDefaultThreshold) {
    width *= 0.9;
  }

  while (height > heightDefaultThreshold) {
    height *= 0.9;
  }

  return { width, height };
};

const CanvasUploadLayout = () => {
  const { setImage, setImageData } = useContext(AppContext);

  const canvasRef = useRef();

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.onload = () => {
        const { width, height } = correctImageRatio(image);
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        setImage(image);
        setImageData(imageData);
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleImage} />
      </div>
      <div>
        <canvas ref={canvasRef} width="800" height="800" />
      </div>
    </>
  );
};

export default CanvasUploadLayout;
