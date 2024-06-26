import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {union, uniqBy} from 'lodash';
import {ResultSet} from 'react-native-sqlite-storage';

export type SalesOpportunityStatus = 'new' | 'closedWon' | 'closedLost';

export type SalesOpportunity = {
  id: number;
  name: string;
  status: SalesOpportunityStatus;
  customerId: number;
};

export type SalesOpportunityDto = Omit<SalesOpportunity, 'id'>;

export type SalesOpportunityState = {
  loading: boolean;
  salesOpportunities: SalesOpportunity[];
  error: string | undefined | null;
  deleting?: number;
  updating?: number;
  page: number;
  size: number;
  isLastPage: boolean;
};

const initialState: SalesOpportunityState = {
  loading: false,
  salesOpportunities: [],
  error: null,
  page: 0,
  size: 10,
  isLastPage: false,
};

export const querySalesOpportunities = createAsyncThunk(
  'salesOpportunitySlice/querySalesOpportunities',
  async ({
    customerId,
    searchQuery,
    page,
    size,
  }: {
    customerId: number;
    searchQuery?: string;
    page?: number;
    size?: number;
  }) => {
    const fSize = size || 10;
    const fPage = page || 0;
    const offset = fPage * fSize;
    const [result]: [ResultSet] = await global.db.executeSql(
      `SELECT * FROM opportunities 
        WHERE 
          customerId = ? AND
          name LIKE ?
        ORDER BY id DESC 
        LIMIT ? OFFSET ?
        `,
      [customerId, `%${searchQuery || ''}%`, fSize, offset],
    );
    return result?.rows?.raw?.();
  },
);

export const createSalesOpportunity = createAsyncThunk(
  'salesOpportunitySlice/createSalesOpportunity',
  async ({salesOpportunityDto}: {salesOpportunityDto: SalesOpportunityDto}) => {
    const {name, status, customerId} = salesOpportunityDto;
    const [result]: [ResultSet] = await global.db.executeSql(
      'INSERT INTO opportunities (name, status, customerId) VALUES (?, ?, ?)',
      [name, status, customerId],
    );
    const insertedId = result.insertId;
    return {...salesOpportunityDto, id: insertedId};
  },
);

export const deleteSalesOpportunity = createAsyncThunk(
  'salesOpportunitySlice/deleteSalesOpportunity',
  async (salesOpportunityId: number) => {
    await global.db.executeSql('DELETE FROM opportunities WHERE id = ?', [
      salesOpportunityId,
    ]);
    return salesOpportunityId;
  },
);

export const updateSalesOpportunity = createAsyncThunk(
  'salesOpportunitySlice/updateSalesOpportunity',
  async ({
    updateSalesOpportunityDto,
  }: {
    updateSalesOpportunityDto: SalesOpportunity;
  }) => {
    const {id, name, status, customerId} = updateSalesOpportunityDto;
    await global.db.executeSql(
      'UPDATE opportunities SET name = ?, status = ?, customerId = ? WHERE id = ?',
      [name, status, customerId, id],
    );
    return updateSalesOpportunityDto;
  },
);

const salesOpportunitySlice = createSlice({
  name: 'salesOpportunitySlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // querySalesOpportunities
    builder
      .addCase(querySalesOpportunities.pending, state => {
        state.loading = true;
      })
      .addCase(querySalesOpportunities.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg?.page) {
          state.salesOpportunities = uniqBy(
            union(state.salesOpportunities, action.payload),
            'id',
          );
        } else {
          state.salesOpportunities = action.payload;
        }
        state.page = action.meta.arg?.page || 0;
        if (!action.payload.length) {
          state.isLastPage = true;
        } else {
          state.isLastPage = false;
        }
      })
      .addCase(querySalesOpportunities.rejected, (state, action) => {
        state.loading = false;
        state.salesOpportunities = [];
        state.error = action.error.message;
      });

    // createSalesOpportunity
    builder
      .addCase(createSalesOpportunity.pending, state => {
        state.loading = true;
      })
      .addCase(createSalesOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.salesOpportunities = [
          action.payload,
          ...state.salesOpportunities,
        ];
      })
      .addCase(createSalesOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.salesOpportunities = [];
        state.error = action.error.message;
      });

    // deleteSalesOpportunity
    builder
      .addCase(deleteSalesOpportunity.pending, (state, action) => {
        state.loading = true;
        state.deleting = action.meta.arg;
      })
      .addCase(deleteSalesOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.salesOpportunities = state.salesOpportunities.filter(
          s => s.id !== action.payload,
        );
      })
      .addCase(deleteSalesOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // updateSalesOpportunity
    builder
      .addCase(updateSalesOpportunity.pending, (state, action) => {
        state.loading = true;
        state.updating = action.meta.arg.updateSalesOpportunityDto.id;
      })
      .addCase(updateSalesOpportunity.fulfilled, (state, action) => {
        state.loading = false;
        state.salesOpportunities = state.salesOpportunities.map(s => {
          if (s.id === action.payload.id) {
            return action.payload;
          }
          return s;
        });
      })
      .addCase(updateSalesOpportunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default salesOpportunitySlice.reducer;
