import React, { useCallback, useMemo, useState } from 'react';
import './NumberGroup.scss';

const NumberGroup = ({ defaultValue, min, max, handleClick, step, groups }) => {
  const [value, setValue] = useState(
    groups
      ? groups.reduce(
          (result, current) => ({
            ...result,
            [current.name]: current.defaultValue
          }),
          {}
        )
      : defaultValue
  );

  console.log('rerendered');

  const onChange = useCallback(
    event => {
      if (groups) {
        setValue(prevValue => ({
          ...prevValue,
          [event.target.name]: parseInt(event.target.value, 10)
        }));
      } else {
        setValue(event.target.value);
      }
    },
    [setValue, groups]
  );

  const onToolboxClick = useCallback(() => handleClick(value), [
    handleClick,
    value
  ]);

  const renderedGroups = useMemo(
    () =>
      groups ? (
        groups.map(group => (
          <input
            type="number"
            min={group.min}
            max={group.max}
            name={group.name}
            onChange={onChange}
            className="toolbox-input"
            value={value[group.name]}
            // step={step}
          />
        ))
      ) : (
        <input
          min={min}
          max={max}
          step={step}
          type="number"
          value={value}
          onChange={onChange}
          className="toolbox-input"
        />
      ),
    [groups, value, onChange]
  );

  return (
    <div className="toolbox-number-group">
      {renderedGroups}

      <button className="toolbox-button" onClick={onToolboxClick} />
    </div>
  );
};

NumberGroup.defaultProps = {
  min: 0,
  max: null
};

export default NumberGroup;
