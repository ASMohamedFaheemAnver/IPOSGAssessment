import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {union, uniqBy} from 'lodash';
import {ResultSet} from 'react-native-sqlite-storage';

export type CustomerStatus = 'active' | 'inactive' | 'lead';

export type Customer = {
  id: number;
  name: string;
  phoneNumber: string;
  status: CustomerStatus;
};

export type CustomerDto = Omit<Customer, 'id'>;

export type CustomerState = {
  loading: boolean;
  customers: Customer[];
  error: string | undefined | null;
  deleting?: number;
  updating?: number;
  page: number;
  size: number;
  isLastPage: boolean;
};

const initialState: CustomerState = {
  loading: false,
  customers: [],
  error: null,
  page: 0,
  size: 10,
  isLastPage: false,
};

export const queryCustomers = createAsyncThunk(
  'customerSlice/queryCustomers',
  async (args?: {searchQuery?: string; page?: number; size?: number}) => {
    const fSize = args?.size || 10;
    const fPage = args?.page || 0;
    const offset = fPage * fSize;
    const query = `
      SELECT * FROM customers 
      WHERE 
        name LIKE ? OR 
        phoneNumber LIKE ?
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `;
    const [result]: [ResultSet] = await global.db.executeSql(query, [
      `%${args?.searchQuery || ''}%`,
      `%${args?.searchQuery || ''}%`,
      fSize,
      offset,
    ]);
    return result?.rows?.raw?.();
  },
);

export const createCustomer = createAsyncThunk(
  'customerSlice/createCustomer',
  async ({customerDto}: {customerDto: CustomerDto}) => {
    const {name, phoneNumber, status} = customerDto;
    const [result]: [ResultSet] = await global.db.executeSql(
      'INSERT INTO customers (name, phoneNumber, status) VALUES (?, ?, ?)',
      [name, phoneNumber, status],
    );
    const insertedId = result.insertId;
    return {...customerDto, id: insertedId};
  },
);

export const deleteCustomer = createAsyncThunk(
  'customerSlice/deleteCustomer',
  async (customerId: number) => {
    // Begin a transaction to ensure atomicity
    await global.db.transaction(tx => {
      return Promise.all([
        // Delete the customer
        tx.executeSql('DELETE FROM customers WHERE id = ?', [customerId]),
        // Delete associated opportunities
        tx.executeSql('DELETE FROM opportunities WHERE customerId = ?', [
          customerId,
        ]),
      ]);
    });
    return customerId;
  },
);

export const updateCustomer = createAsyncThunk(
  'customerSlice/updateCustomer',
  async ({updateCustomerDto}: {updateCustomerDto: Customer}) => {
    const {id, name, phoneNumber, status} = updateCustomerDto;
    await global.db.executeSql(
      'UPDATE customers SET name = ?, phoneNumber = ?, status = ? WHERE id = ?',
      [name, phoneNumber, status, id],
    );
    return updateCustomerDto;
  },
);

const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // queryCustomers
    builder
      .addCase(queryCustomers.pending, state => {
        state.loading = true;
      })
      .addCase(queryCustomers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg?.page) {
          state.customers = uniqBy(
            union(state.customers, action.payload),
            'id',
          );
        } else {
          state.customers = action.payload;
        }
        state.page = action.meta.arg?.page || 0;
        if (!action.payload.length) {
          state.isLastPage = true;
        } else {
          state.isLastPage = false;
        }
      })
      .addCase(queryCustomers.rejected, (state, action) => {
        state.loading = false;
        state.customers = [];
        state.error = action.error.message;
      });

    // createCustomer
    builder
      .addCase(createCustomer.pending, state => {
        state.loading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = [action.payload, ...state.customers];
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.loading = false;
        state.customers = [];
        state.error = action.error.message;
      });

    // deleteCustomer
    builder
      .addCase(deleteCustomer.pending, (state, action) => {
        state.loading = true;
        console.log(action.meta);
        state.deleting = action.meta.arg;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // updateCustomer
    builder
      .addCase(updateCustomer.pending, (state, action) => {
        state.loading = true;
        state.updating = action.meta.arg.updateCustomerDto.id;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = state.customers.map(c => {
          if (c.id === action.payload.id) {
            return action.payload;
          }
          return c;
        });
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = customerSlice.actions;

export default customerSlice.reducer;
