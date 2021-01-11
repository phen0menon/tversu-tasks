import { combineReducers } from 'redux';
import image from './image';
import loader from './loader';

export default combineReducers({
  image,
  loader
});
