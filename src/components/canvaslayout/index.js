import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

const CanvasLayout = () => {
  const ref = useRef();
  // const canvasCtx = ref.current.getContext("2d");

  return <canvas ref={ref} />;
};

export default CanvasLayout;
