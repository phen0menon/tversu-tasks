export const SET_FILTER_NAME_ACTION = 'SET_FILTER_NAME_ACTION';

export const setFilterName = name => dispatch =>
  dispatch({ type: SET_FILTER_NAME_ACTION, value: name });
