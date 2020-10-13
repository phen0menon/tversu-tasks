import { h } from "preact";
import { useCallback, useContext, useRef, useState } from "preact/hooks";
import { AppContext } from "../../components/App/context";
import styles from "./styles.scss";

const Upload = () => {
  const { setImage, setImageData } = useContext(AppContext);

  const canvasRef = useRef();

  const imageUploadRef = useRef();
  const onImageUploadClick = useCallback(() => {
    imageUploadRef.current.click();
  }, [imageUploadRef]);

  // const [localData, setLocalData] = useState({
  //   image: null,
  //   imageData: null,
  // });

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      const dWidth = 800;
      image.onload = () => {
        const { width, height } = image;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const fHeight = height * (dWidth / width);
        canvas.height = fHeight;
        canvas.width = dWidth;

        context.clearRect(0, 0, width, fHeight);
        context.drawImage(image, 0, 0, dWidth, fHeight);
        const imageData = context.getImageData(0, 0, width, height);
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={styles.root}>
      <div>
        <input
          type="file"
          ref={imageUploadRef}
          onChange={handleImage}
          style={{ display: "none" }}
        />
        <button onClick={onImageUploadClick} className={styles.button}>
          Upload image
        </button>
      </div>
      <div className={styles.canvas}>
        <canvas ref={canvasRef} width="800" height="600" />
      </div>
    </div>
  );
};

export default Upload;
