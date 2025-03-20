import { orderBurgerApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IOrderState {
  order: TOrder | null;
  isOrderRequest: boolean;
  errorMsg: string;
}

export const initialState: IOrderState = {
  order: null,
  isOrderRequest: false,
  errorMsg: ''
};

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    removeOrder: (state) => {
      state.order = null;
      state.isOrderRequest = false;
    }
  },
  selectors: {
    isOrderRequestSelector: (state) => state.isOrderRequest,
    orderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isOrderRequest = true;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.errorMsg = action.error.message || '';
        console.error('postOrder/reject', action.error);
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.order = action.payload.order;
      });
  }
});

export const { removeOrder } = orderSlice.actions;
export const { isOrderRequestSelector, orderSelector } = orderSlice.selectors;
export default orderSlice.reducer;
