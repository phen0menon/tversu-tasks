import { SET_LOADER_SHOWN } from '../actions/loader';

const initialState = {
  isShown: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADER_SHOWN:
      return { ...state, isShown: action.value };
    default:
      return state;
  }
}
