import { h } from "preact";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";

import UploadButton from "../UploadButton";

import Tabs from "../Tabs";
import TabHeader from "../Tabs/TabHeader";
import TabHeaderItem from "../Tabs/TabHeaderItem";
import TabItem from "../Tabs/TabItem";
import CanvasLayout from "../CanvasLayout";
import GrayscaleTab from "../../tabs/Grayscale";
import HistogramTab from "../../tabs/Histogram";
import CanvasUploadLayout from "../../tabs/Upload";
import { AppContext } from "./context";

import styles from "./styles.scss";

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [image, setImage] = useState(null);
  const originalImage = useRef();

  const canvasRef = useRef();

  const canvasContext = useMemo(() => {
    return canvasRef.current ? canvasRef.current.getContext("2d") : null;
  }, [canvasRef.current]);

  const originalPixels = useRef([]);
  const setOriginalPixels = useCallback(
    (value) => (originalPixels.current = value),
    [originalPixels]
  );

  useEffect(() => {
    if (imageData && canvasContext) {
      canvasContext.putImageData(imageData, 0, 0);
    }
  }, [imageData, canvasContext]);

  return (
    <AppContext.Provider
      value={{
        image,
        setImage,
        imageData,
        setImageData,
        originalImage,
        canvasRef,
        canvasContext,

        originalPixels: originalPixels.current,
        setOriginalPixels,
      }}
    >
      <div id="app" className={styles.root}>
        <Tabs defaultActiveTabId="0">
          <TabHeader className={styles.tabHeader}>
            <TabHeaderItem id="-1" render={() => <UploadButton />} />
            <TabHeaderItem id="0">Grayscale</TabHeaderItem>
            <TabHeaderItem id="1">Histogram</TabHeaderItem>
          </TabHeader>
          <div className={styles.tabLayout}>
            <TabItem id="0">
              <GrayscaleTab />
            </TabItem>
            <TabItem id="1">
              <HistogramTab />
            </TabItem>
          </div>
          <div className={styles.canvas}>
            <canvas ref={canvasRef} width="800" height="600" />
          </div>
        </Tabs>
      </div>
    </AppContext.Provider>
  );
};

export default App;
