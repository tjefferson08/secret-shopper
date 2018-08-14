import { combineReducers } from 'redux';
import authentication from './authentication/reducers';
import recipes from './recipes/reducers';
import registration from './registration/reducers';

export default combineReducers({
  authentication,
  recipes,
  registration
});
