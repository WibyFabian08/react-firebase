import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer';

// store
export const store = createStore(reducer, applyMiddleware(thunk));