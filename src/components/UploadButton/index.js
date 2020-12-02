import { useContext } from "preact/hooks";
import React, { useRef, useCallback } from "react";
import uploadIcon from "../../assets/icons/upload.svg";
import { AppContext } from "../App/context";

import styles from "./styles.scss";

const UploadButton = () => {
  const { canvasRef, setImage, setImageData, setOriginalPixels } = useContext(
    AppContext
  );

  const imageUploadRef = useRef();
  const onImageUploadClick = useCallback(() => {
    imageUploadRef.current.click();
  }, [imageUploadRef]);

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      const dWidth = 600;
      image.onload = () => {
        const { width, height } = image;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const fHeight = height * (dWidth / width);
        canvas.height = fHeight;
        canvas.width = dWidth;

        context.clearRect(0, 0, dWidth, fHeight);
        context.drawImage(image, 0, 0, dWidth, fHeight);

        const imageData = context.getImageData(0, 0, dWidth, fHeight);
        const imageDataCopy = context.getImageData(0, 0, dWidth, fHeight).data;

        setImage(image);
        setImageData(imageData);
        setOriginalPixels(imageDataCopy);
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <button onClick={onImageUploadClick} className={styles.root}>
        <span>Upload image</span>
        <img src={uploadIcon} alt="Upload icon" />
      </button>
      <input
        type="file"
        ref={imageUploadRef}
        onChange={handleImage}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadButton;
