export const SET_LOADER_SHOWN = 'SET_LOADER_SHOWN';

export const setLoaderShown = value => dispatch =>
  dispatch({ type: SET_LOADER_SHOWN, value });

export const showLoader = () => setLoaderShown(true);

export const hideLoader = () => setLoaderShown(false);
