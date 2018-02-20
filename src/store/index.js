import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = Map();


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
);
/* eslint-enable */

export default store;
