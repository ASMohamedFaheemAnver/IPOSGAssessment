import {createSlice} from '@reduxjs/toolkit';

type CustomerState = {
  customers: any[];
};

const initialState: CustomerState = {
  customers: [],
};

export const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {},
});

export const {} = customerSlice.actions;

export default customerSlice.reducer;
