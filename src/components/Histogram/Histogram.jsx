import React, { useEffect, useRef } from 'react';

const Histogram = ({ data, color }) => {
  const canvasRef = useRef();

  const drawHistogram = () => {
    if (!data || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    const maxValue = Math.max(255, Math.max(...data));
    canvasContext.fillStyle = color || 0;

    data.forEach((el, index) => {
      // Scale values and reverse as (0, 0) is top left corner
      const val = Math.floor(255 * ((maxValue - el) / maxValue));
      canvasContext.fillRect(index, val, 1, 255 - val);
    });
  };

  useEffect(() => {
    drawHistogram();
  });

  return <canvas ref={canvasRef} width={256} height={256} />;
};

export default Histogram;
