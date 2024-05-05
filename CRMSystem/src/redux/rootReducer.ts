import {combineReducers} from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import salesOpportunityReducer from './slices/salesOpportunitySlice';

const rootReducer = combineReducers({
  customer: customerReducer,
  salesOpportunity: salesOpportunityReducer,
});

export {rootReducer};
