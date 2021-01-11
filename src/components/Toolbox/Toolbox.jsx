import React from 'react';

import { getGrayscaledFlag, getHistogramData } from '../../selectors/image';
import {
  createGrayscale,
  createNegative,
  createSolarised,
  createIncreasedContrast,
  createDecreasedContrast,
  createBlurredImage,
  createBinarized,
  createImageWithMedianFilter,
  createGammaized,
  createQuantonized
} from '../../actions';
import useAction from '../../hooks/useAction';
import { useSelector } from 'react-redux';
import ExpandableContainer from './ExpandableContainer';
import ActionLink from './ActionLink';
import Histogram from '../Histogram/Histogram';
import TooltippedSlider from './TooltippedSlider';
import NumberGroup from './NumberGroup';
import './Toolbox.scss';

const pseudocoloringGroups = [
  {
    min: 0,
    max: 255,
    defaultValue: 0,
    name: 'firstBorder'
  },
  {
    min: 0,
    max: 255,
    defaultValue: 0,
    name: 'secondBorder'
  },
  {
    min: 0,
    max: 255,
    defaultValue: 0,
    name: 'thirdBorder'
  }
];

const Toolbox = () => {
  const histogram = useSelector(getHistogramData);
  const grayscaled = useSelector(getGrayscaledFlag);

  const onCreateGrayscale = useAction(createGrayscale);
  const onCreateNegative = useAction(createNegative);
  const onCreateSolarised = useAction(createSolarised);
  const onCreateIncreasedContrast = useAction(createIncreasedContrast);
  const onCreateDecreasedContrast = useAction(createDecreasedContrast);
  const onCreateBlurredImage = useAction(createBlurredImage);
  const onCreateImageWithMedianFilter = useAction(createImageWithMedianFilter);
  const onCreateBinarized = useAction(createBinarized);
  const onCreateGammaized = useAction(createGammaized);
  const onCreateQuantonized = useAction(createQuantonized);

  return (
    <div className="toolbox">
      <div className="toolbox__inner" style={{ zIndex: 1 }}>
        <div className="toolbox-group">
          <div>
            <ExpandableContainer title="Гистограмма">
              <Histogram data={histogram} color="black" />
            </ExpandableContainer>
          </div>
        </div>
        <div className="toolbox-group">
          <div>
            <div>
              <ActionLink
                title="Оттенки серого"
                handleClick={onCreateGrayscale}
              />

              <ExpandableContainer title="Негатив">
                <TooltippedSlider
                  max={255}
                  min={0}
                  handleClick={value => onCreateNegative(value)}
                  // onChange={value => onCreateNegative(value)}
                />
              </ExpandableContainer>

              <ExpandableContainer title="Бинаризация (grayscale)">
                <TooltippedSlider
                  min={0}
                  max={255}
                  handleClick={value => onCreateBinarized(value)}
                  // onChange={value => onCreateBinarized(value)}
                />
              </ExpandableContainer>

              <ExpandableContainer title="Гамма (grayscale)">
                <TooltippedSlider
                  min={0}
                  max={255}
                  handleClick={value => onCreateGammaized(value)}
                  // onChange={value => onCreateGammaized(value)}
                />
              </ExpandableContainer>

              <ExpandableContainer title="Квантование (grayscale)">
                <TooltippedSlider
                  min={0}
                  max={255}
                  handleClick={value => onCreateQuantonized(value)}
                  // onChange={value => onCreateQuantonized(value)}
                />
              </ExpandableContainer>

              <ExpandableContainer title="Соляризация (grayscale)">
                <NumberGroup
                  defaultValue={0.01}
                  step={0.005}
                  handleClick={value => onCreateSolarised(value)}
                />
              </ExpandableContainer>

              <ExpandableContainer title="Псевдораскрашивание">
                {/* <NumberGroup
                  handleClick={value => console.log(value)}
                  groups={pseudocoloringGroups}
                /> */}
                Не доделано
              </ExpandableContainer>

              <ExpandableContainer title="Увеличение контрастности">
                <TooltippedSlider
                  min={0}
                  max={255}
                  range
                  defaultValue={[50, 150]}
                  handleClick={value =>
                    onCreateIncreasedContrast(value[0], value[1])
                  }
                />
              </ExpandableContainer>

              <ExpandableContainer title="Уменьшение контрастности">
                <TooltippedSlider
                  min={0}
                  max={255}
                  range
                  defaultValue={[50, 150]}
                  handleClick={value =>
                    onCreateDecreasedContrast(value[0], value[1])
                  }
                />
              </ExpandableContainer>

              <ExpandableContainer title="Сглаживание">
                <TooltippedSlider
                  min={3}
                  max={20}
                  defaultValue={3}
                  handleClick={value => onCreateBlurredImage(value)}
                />
              </ExpandableContainer>

              <ActionLink
                title="Медианный фильтр"
                handleClick={onCreateImageWithMedianFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
