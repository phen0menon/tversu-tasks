import { h } from "preact";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
import { AppContext } from "../../components/App/context";
import { initialState, keys, normalize } from "./fixtures";
import styles from "./styles.scss";

const GrayscaleTab = () => {
  const { canvasContext, imageData, originalPixels, setImageData } = useContext(
    AppContext
  );

  const [rgbState, setRgbState] = useState(initialState);

  const grayscaleProcess = () => {
    const { red, green, blue } = rgbState;
    const rWeight = normalize(red, red, green, blue);
    const gWeight = normalize(green, red, green, blue);
    const bWeight = normalize(blue, red, green, blue);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const intensity = Math.min(
        rWeight * originalPixels[i] +
          gWeight * originalPixels[i + 1] +
          bWeight * originalPixels[i + 2],
        255
      );

      imageData.data[i] = intensity;
      imageData.data[i + 1] = intensity;
      imageData.data[i + 2] = intensity;
    }

    canvasContext.putImageData(imageData, 0, 0);
    setImageData(imageData);
  };

  useEffect(() => {
    if (imageData) {
      grayscaleProcess();
    }
  }, [rgbState]);

  const onRangeChange = (event) => {
    const { name, value } = event.target;
    setRgbState((prevState) => ({
      ...prevState,
      [name]: Math.max(parseInt(value, 10), 0),
    }));
  };

  const renderedInputs = useMemo(
    () =>
      keys.map((key) => (
        <div key={key}>
          <div>{key}:</div>
          <div className={styles.inputWrapper}>
            <input
              type="range"
              name={key}
              value={rgbState[key]}
              onInput={onRangeChange}
              min={0}
              max={255}
            />
            {rgbState[key]}
          </div>
        </div>
      )),
    [onRangeChange, rgbState]
  );

  return <div className={styles.root}>{renderedInputs}</div>;
};

export default GrayscaleTab;
