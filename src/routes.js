import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from './containers/App';
import CategoriesPage from './components/CategoriesPage';
import LocationsPage from './components/LocationsPage';

export const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CategoriesPage} />

      <Route path="/categories" component={CategoriesPage} />
      <Route path="/locations" component={LocationsPage} />
    </Route>

    <Redirect from="*" to="/" />
  </Router>
);

export default routes;
