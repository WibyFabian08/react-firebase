import { createStore } from 'redux';
import reducer from '../reducer';

// store
export const store = createStore(reducer);