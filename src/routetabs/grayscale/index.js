import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";

const initialState = {
  red: 0,
  green: 0,
  blue: 0,
};

const keys = Object.keys(initialState);

const GrayscaleTab = () => {
  const [rgbState, setRgbState] = useState(initialState);

  const onRangeChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setRgbState((prevState) => ({ ...prevState, [name]: value }));
    },
    [setRgbState]
  );

  const renderedInputs = useMemo(
    () =>
      keys.map((key) => (
        <div>
          {key}:
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
      )),
    [onRangeChange, rgbState]
  );

  return <div>{renderedInputs}</div>;
};

export default GrayscaleTab;
