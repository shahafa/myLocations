import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from './containers/App';
import Categories from './components/Categories';
import Locations from './components/Locations';

export const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Categories} />

      <Route path="/categories" component={Categories} />
      <Route path="/locations" component={Locations} />
    </Route>

    <Redirect from="*" to="/" />
  </Router>
);

export default routes;
