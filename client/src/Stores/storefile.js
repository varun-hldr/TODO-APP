import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import promiseMiddleware from 'redux-promise';

import reducer from '../Reducers/mainReducers';

let store = createStore(reducer,applyMiddleware(promiseMiddleware,logger))

export default store;