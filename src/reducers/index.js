import { combineReducers } from 'redux';
import categories from './categories';
import locations from './locations';

const reducers = combineReducers({
  categories,
  locations,
});

export default reducers;
