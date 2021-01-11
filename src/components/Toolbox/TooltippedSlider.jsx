import React, { useCallback, useMemo, useState } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './TooltippedSlider.scss';

const _RangeSlider = createSliderWithTooltip(Slider.Range);
const _Slider = createSliderWithTooltip(Slider);

const TooltippedSlider = props => {
  const [value, setValue] = useState(props.defaultValue || 0);
  const Component = props.range ? _RangeSlider : _Slider;

  const onComponentChange = useCallback(
    value => {
      setValue(value);
      if (props.onChange) {
        props.onChange(value);
      }
    },
    [setValue, props.onChange]
  );

  const onTipClick = useCallback(
    () => props.handleClick && props.handleClick(value),
    [props.handleClick, value]
  );

  return (
    <div className="tooltipped-slider">
      <Component {...props} onChange={onComponentChange} />
      <button className="toolbox-button" onClick={onTipClick} />
    </div>
  );
};

export default TooltippedSlider;
