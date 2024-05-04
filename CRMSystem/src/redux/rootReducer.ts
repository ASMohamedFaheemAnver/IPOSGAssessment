import {combineReducers} from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';

const rootReducer = combineReducers({
  customer: customerReducer,
});

export {rootReducer};
