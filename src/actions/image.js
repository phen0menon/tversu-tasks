import { getDimensions, getFilename } from '../selectors/image';
import { getFilePixelData } from '../helpers/canvas';
import { showLoader } from './loader';
import * as imageProcessor from '../lib/imageProcessor';

export const SET_FILENAME_ACTION = 'SET_FILENAME_ACTION';
export const SET_HISTOGRAM_DATA = 'SET_HISTOGRAM_DATA';
export const SET_GRAYSCALED_FLAG = 'SET_GRAYSCALED_FLAG';

export const SET_DIMENSIONS = 'SET_DIMENSIONS';
export const CHOOSE_FILE = 'CHOOSE_FILE';
export const UPDATE_IMAGE_DATA = 'UPDATE_IMAGE_DATA';

export const CALCULATE_HISTOGRAM = 'CALCULATE_HISTOGRAM';
export const CREATE_GRAYSCALE_IMAGE = 'CREATE_GRAYSCALE_IMAGE';
export const CREATE_NEGATIVE_IMAGE = 'CREATE_NEGATIVE_IMAGE';
export const CREATE_SOLARISED_IMAGE = 'CREATE_SOLARISED_IMAGE';
export const CREATE_INCREASED_CONTRAST = 'CREATE_INCREASED_CONTRAST';
export const CREATE_DECREASED_CONTRAST = 'CREATE_DECREASED_CONTRAST';
export const CREATE_BLURRED_IMAGE = 'CREATE_BLURRED_IMAGE';
export const CREATE_BINARIZED_IMAGE = 'CREATE_BINARIZED_IMAGE';
export const CREATE_GAMMA_IMAGE = 'CREATE_GAMMA_IMAGE';
export const CREATE_QUANTONIZATION_IMAGE = 'CREATE_QUANTONIZATION_IMAGE';
export const CREATE_PSEUDO_COLORIZED_IMAGE = 'CREATE_PSEUDO_COLORIZED_IMAGE';
export const CREATE_IMAGE_WITH_MEDIAN_FILTER =
  'CREATE_IMAGE_WITH_MEDIAN_FILTER';

const imageActions = {
  [CALCULATE_HISTOGRAM]: payload =>
    imageProcessor.calculateHistogram(payload.data, payload.channel),
  [CREATE_GRAYSCALE_IMAGE]: payload =>
    imageProcessor.calculateGrayscale(payload.data),
  [CREATE_NEGATIVE_IMAGE]: payload =>
    imageProcessor.calculateNegative(payload.data, payload.threshold),
  [CREATE_SOLARISED_IMAGE]: payload =>
    imageProcessor.calculateSolarisation(payload.data, payload.k),
  [CREATE_INCREASED_CONTRAST]: payload =>
    imageProcessor.increaseContrast(payload.data, payload.min, payload.max),
  [CREATE_DECREASED_CONTRAST]: payload =>
    imageProcessor.decreaseContrast(payload.data, payload.min, payload.max),
  [CREATE_BLURRED_IMAGE]: payload =>
    imageProcessor.applyBlurFilter(
      payload.data,
      payload.width,
      payload.height,
      payload.k
    ),
  [CREATE_IMAGE_WITH_MEDIAN_FILTER]: payload =>
    imageProcessor.applyMedianFilter(
      payload.data,
      payload.width,
      payload.height
    ),
  [CREATE_BINARIZED_IMAGE]: payload =>
    imageProcessor.calculateBinarization(payload.data, payload.val),
  [CREATE_GAMMA_IMAGE]: payload =>
    imageProcessor.calculateGamma(payload.data, payload.val),
  [CREATE_QUANTONIZATION_IMAGE]: payload =>
    imageProcessor.calculateQuantonization(payload.data, payload.val),
  [CREATE_PSEUDO_COLORIZED_IMAGE]: payload =>
    imageProcessor.pseudocoloring(payload.data, payload.val)
};

const runFilter = (filter, userData = {}) => {
  return async (dispatch, getState) => {
    const { width, height } = getDimensions(getState());
    if (width > 1000 || height > 1000) {
      dispatch(showLoader());
    }
    const data = (await getFilePixelData(getFilename(getState()))).data;
    const response = imageActions[filter]({
      data,
      width,
      height,
      ...userData
    });
    dispatch({
      type: UPDATE_IMAGE_DATA,
      data: response,
      width,
      height
    });
  };
};

export const setFilename = filename => dispatch =>
  dispatch({ type: SET_FILENAME_ACTION, value: filename });

export const setHistogramData = data => dispatch =>
  dispatch({ type: SET_HISTOGRAM_DATA, data });

export const setDimensions = (width, height) => dispatch =>
  dispatch({ type: SET_DIMENSIONS, width, height });

export const setGrayscaledFlag = value => dispatch =>
  dispatch({ type: SET_GRAYSCALED_FLAG, value });

export const chooseFile = filename => dispatch =>
  dispatch({ type: CHOOSE_FILE, value: filename });

export const calculateHistogram = data => dispatch => {
  const result = imageActions[CALCULATE_HISTOGRAM]({ data });
  dispatch(setHistogramData(result));
};
export const createGrayscale = () => dispatch => {
  return dispatch(runFilter(CREATE_GRAYSCALE_IMAGE)).then(() =>
    dispatch(setGrayscaledFlag(true))
  );
};

export const createNegative = threshold =>
  runFilter(CREATE_NEGATIVE_IMAGE, { threshold });

export const createSolarised = k => runFilter(CREATE_SOLARISED_IMAGE, { k });

export const createBinarized = val =>
  runFilter(CREATE_BINARIZED_IMAGE, { val });

export const createGammaized = val => runFilter(CREATE_GAMMA_IMAGE, { val });

export const createQuantonized = val =>
  runFilter(CREATE_QUANTONIZATION_IMAGE, { val });

export const createIncreasedContrast = (min, max) =>
  runFilter(CREATE_INCREASED_CONTRAST, { min, max });

export const createDecreasedContrast = (min, max) =>
  runFilter(CREATE_DECREASED_CONTRAST, { min, max });

export const createBlurredImage = k => runFilter(CREATE_BLURRED_IMAGE, { k });

export const createImageWithMedianFilter = () =>
  runFilter(CREATE_IMAGE_WITH_MEDIAN_FILTER);

export const createPseudocolorized = (min, max) =>
  runFilter(CREATE_PSEUDO_COLORIZED_IMAGE, { min, max });
