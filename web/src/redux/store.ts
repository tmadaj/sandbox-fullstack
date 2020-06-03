import { createStore, compose, combineReducers } from 'redux';
import { debounce } from 'lodash';
import * as reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const serialisedState = localStorage.getItem('reduxState');
const preloadedState = serialisedState ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(combineReducers({ ...reducers }), preloadedState, composeEnhancer());

store.subscribe(
  debounce(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  }, 1000),
);

export { store as default };
