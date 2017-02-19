import { createStore, compose } from 'redux';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

let enhancer;
if (process.env.NODE_ENV === 'production') {
  enhancer = persistState(/*paths, config*/);
} else {
  enhancer = compose(
    persistState(/*paths, config*/),
    DevTools.instrument(),
  );
}

const store = createStore(rootReducer, enhancer);

export default store;
