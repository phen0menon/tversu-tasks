import { h } from "preact";
import { useRef, useState } from "preact/hooks";

import Tabs from "../Tabs";
import TabHeader from "../Tabs/TabHeader";
import TabHeaderItem from "../Tabs/TabHeaderItem";
import TabItem from "../Tabs/TabItem";
import CanvasLayout from "../CanvasLayout";
import GrayscaleTab from "../../tabs/Grayscale";
import HistogramTab from "../../tabs/Histogram";
import CanvasUploadLayout from "../../tabs/Upload";
import { AppContext } from "./context";

import uploadIcon from "../../assets/icons/upload.svg";

import styles from "./styles.scss";

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
        <Tabs defaultActiveTabId="0">
          <TabHeader className={styles.tabHeader}>
            <TabHeaderItem
              id="-1"
              render={(onClick) => (
                <button onClick={onClick} className={styles.newImageButton}>
                  <span>Upload image</span>
                  <img src={uploadIcon} alt="Upload icon" />
                </button>
              )}
            />
            <TabHeaderItem id="0">Grayscale</TabHeaderItem>
            <TabHeaderItem id="1">Histogram</TabHeaderItem>
          </TabHeader>
          <div className={styles.tabLayout}>
            <TabItem id="-1">
              <CanvasUploadLayout />
            </TabItem>
            <TabItem id="0">
              <GrayscaleTab />
            </TabItem>
            <TabItem id="1">
              <HistogramTab />
            </TabItem>
          </div>
        </Tabs>
      </div>
    </AppContext.Provider>
  );
};

export default App;
