import {createSlice} from '@reduxjs/toolkit';

export type SalesOpportunity = {
  id: number;
  name: string;
  status: string;
  customerId: number;
};

export type SalesOpportunityDto = Omit<SalesOpportunity, 'id'>;

export type SalesOpportunityState = {
  loading: boolean;
  salesOpportunities: SalesOpportunity[];
  error: string | undefined | null;
  deleting?: number;
  updating?: number;
};

const initialState: SalesOpportunityState = {
  loading: false,
  salesOpportunities: [],
  error: null,
};

const salesOpportunitySlice = createSlice({
  name: 'salesOpportunitySlice',
  initialState,
  reducers: {},
});

export default salesOpportunitySlice.reducer;
