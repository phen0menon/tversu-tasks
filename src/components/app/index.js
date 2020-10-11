import { createContext, h } from "preact";
import { useRef, useState } from "preact/hooks";

import CanvasUploadLayout from "../canvasuploadlayout";
import Tabs from "../tabs";
import TabHeader from "../tabs/tabheader";
import TabHeaderItem from "../tabs/tabheaderitem";
import TabItem from "../tabs/tabitem";
import CanvasLayout from "../canvaslayout";
import GrayscaleTab from "../../routetabs/grayscale";
import HistogramTab from "../../routetabs/histogram";

import styles from "./styles.css";

export const AppContext = createContext();

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [image, setImage] = useState(null);
  const originalImage = useRef();

  return (
    <AppContext.Provider
      value={{
        image,
        setImage,
        imageData,
        setImageData,
        originalImage,
      }}
    >
      <div id="app" className={styles.root}>
        {image && (
          <>
            <Tabs defaultActiveTabId="0">
              <TabHeader>
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
            </Tabs>

            <CanvasLayout>q</CanvasLayout>
          </>
        )}

        {!image && <CanvasUploadLayout />}
      </div>
    </AppContext.Provider>
  );
};

export default App;
