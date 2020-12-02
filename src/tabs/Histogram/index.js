import { h } from "preact";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "preact/hooks";
import { AppContext } from "../../components/App/context";
import styles from "./styles.scss";

const correctBounds = (value) => {
  if (value > 255) return 255;
  else if (value < 0) return 0;
  return value;
};

const extractRed = (value) => value & 0xff;
const extractGreen = (value) => (value >> 8) & 0xff;
const extractBlue = (value) => (value >> 16) & 0xff;

const HistogramTab = () => {
  const { originalPixels } = useContext(AppContext);

  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);

  const onBrightnessChange = useCallback(
    (event) => setBrightness(parseInt(event.target.value)),
    [setBrightness]
  );

  const onContrastChange = useCallback(
    (event) => setContrast(parseInt(event.target.value)),
    [setContrast]
  );

  const computedAverageGray = useMemo(() => {
    // const grey = originalPixels.reduce((result, current, index) => {
    //   return (result +=
    //     extractRed(current) * 0.2126 +
    //     extractGreen(current) * 0.7152 +
    //     extractBlue(current) * 0.0722);
    // }, 0);
    // return grey / originalPixels.length;
    let avg = 0;
    for (let i = 0; i < originalPixels.length; i += 4) {
      avg +=
        originalPixels[i] * 0.2126 +
        originalPixels[i + 1] * 0.7152 +
        originalPixels[i + 2] * 0.0722;
    }
    return avg / originalPixels.length;
  }, [originalPixels]);

  useEffect(() => {
    console.log(originalPixels);
    // const data = originalPixels.reduce((result, current) => {
    //   const r = correctBounds(
    //     (extractRed(current) - computedAverageGray) * contrast + brightness
    //   );
    //   const g = correctBounds(
    //     (extractGreen(current) - computedAverageGray) * contrast + brightness
    //   );
    //   const b = correctBounds(
    //     (extractBlue(current) - computedAverageGray) * contrast + brightness
    //   );

    //   result.push((current & 0xff000000) | (b << 16) | (g << 8) | r);

    //   return result;
    // }, []);

    const data = [];
    for (let i = 0; i < originalPixels.length; i += 4) {
      data[i] =
        (originalPixels[i] - computedAverageGray) * contrast + brightness;
      data[i + 1] =
        (originalPixels[i + 1] - computedAverageGray) * contrast + brightness;
      data[i + 2] =
        (originalPixels[i + 2] - computedAverageGray) * contrast + brightness;
    }

    const histBrightness = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 4) {
      histBrightness[data[i + 1]]++;
      histBrightness[data[i + 2]]++;
      histBrightness[data[i + 3]]++;
    }

    const maxBrightness = histBrightness.reduce(
      (result, current) => (result < current ? current : result),
      0
    );

    console.log(maxBrightness);
  }, [contrast, brightness]);

  return (
    <div className={styles.root}>
      <div>
        <div>Brightness</div>
        <input
          type="range"
          value={brightness}
          onInput={onBrightnessChange}
          min={-255}
          max={255}
        />
      </div>
      <div>
        <div>Contrast</div>
        <input
          type="range"
          value={contrast}
          onInput={onContrastChange}
          min={-255}
          max={255}
        />
      </div>
    </div>
  );
};

export default HistogramTab;
