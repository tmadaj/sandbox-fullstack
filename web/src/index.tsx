import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import ThemeProvider from 'styles/themeProvider';
import GlobalStyles from 'styles/global';
import PrivateRoute from 'components/PrivateRoute';
import Layout from 'components/Layout';
import Throbber from 'components/Throbber';

const Login = lazy(() => import('screens/Login'));
const Register = lazy(() => import('screens/Register'));
const Restaurants = lazy(() => import('screens/Restaurants'));
const RestaurantDetail = lazy(() => import('screens/RestaurantDetail'));
const RestaurantNew = lazy(() => import('screens/RestaurantNew'));

const RootApp = (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <Layout>
          <Suspense fallback={<Throbber />}>
            <Switch>
              <Redirect exact from="/" to="/restaurants" />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/restaurants" component={Restaurants} />
              <PrivateRoute
                exact
                path="/restaurant/new"
                component={RestaurantNew}
                restrictRole="owner"
              />
              <PrivateRoute exact path="/restaurant/:restaurantId" component={RestaurantDetail} />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  </Provider>
);

const root = document.getElementById('root');

if (root) ReactDOM.render(RootApp, root);

if (module.hot) module.hot.accept();
