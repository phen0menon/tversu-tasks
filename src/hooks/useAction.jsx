import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default action => {
  const dispatch = useDispatch();

  const handler = useCallback((...payload) => dispatch(action(...payload)), [
    dispatch,
    action
  ]);

  return handler;
};
