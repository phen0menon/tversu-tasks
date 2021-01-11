import React, { useEffect, useRef } from 'react';
import { GPU } from 'gpu.js';

const Module2AppContainer = () => {
  const webglCanvas = useRef();
  const twoDCanvas = useRef();

  const gpuRef = useRef(null);

  const initCanvas = () => {
    const webglContext = webglCanvas.current.getContext('webgl2');

    gpuRef.current = new GPU({
      canvas: webglCanvas.current,
      webGl: webglContext
    });
  };

  useEffect(() => {
    const scale = 3;

    const twodContext = twoDCanvas.current.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src =
      'https://images.unsplash.com/photo-1606851361433-bb99e83b0385?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';

    initCanvas();

    image.onload = function() {
      twoDCanvas.current.width = image.width;
      twoDCanvas.current.height = image.height;
      twodContext.drawImage(image, 0, 0);

      const imgData = twodContext.getImageData(0, 0, image.width, image.height);
      const gpuRender = gpuRef.current
        .createKernel(
          function(sprite) {
            var x = Math.floor(this.thread.x / this.constants.s) * 4;
            var y =
              Math.floor(this.constants.h - this.thread.y / this.constants.s) *
              4 *
              this.constants.w;
            var index = x + y;
            var r = sprite[index] / 255;
            var g = sprite[index + 1] / 255;
            var b = sprite[index + 2] / 255;
            var a = sprite[index + 3] / 255;
            this.color(r, g, b, a);
          },
          {
            constants: {
              w: image.width,
              h: image.height,
              s: scale
            }
          }
        )
        .setOutput([image.width * scale, image.height * scale])
        .setGraphical(true);

      gpuRender(imgData.data);
    };
  });

  return (
    <React.Fragment>
      <canvas ref={webglCanvas} className="c1" />
      <canvas ref={twoDCanvas} className="c2" />
    </React.Fragment>
  );
};

export default Module2AppContainer;
