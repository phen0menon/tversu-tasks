import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getFilename } from '../../selectors/image';
import { drawFileOnCanvas } from '../../helpers/canvas';
import './ImageRenderer.scss';

const ImageRenderer = () => {
  const canvasRef = useRef();
  const image = useSelector(getFilename);

  const drawImage = () => {
    drawFileOnCanvas(canvasRef.current, image);
  };

  useEffect(() => {
    drawImage();
  });

  return <canvas className="image-display" ref={canvasRef} />;
};

export default ImageRenderer;
