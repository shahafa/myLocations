import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import categories from './categories';
import locations from './locations';

const reducers = combineReducers({
  routing: routerReducer,
  categories,
  locations,
});

export default reducers;
