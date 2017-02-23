import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/store';
import App from './containers/App';
import CategoriesPage from './components/CategoriesPage';
import LocationsPage from './components/LocationsPage';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export const routes = () => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={CategoriesPage} />

      <Route path="/categories" component={CategoriesPage} />
      <Route path="/locations" component={LocationsPage} />
    </Route>

    <Redirect from="*" to="/" />
  </Router>
);

export default routes;
