import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IOrderState {
  order: TOrder | null;
  isOrderLoaded: boolean;
  errorMsg: string;
}

export const initialState: IOrderState = {
  order: null,
  isOrderLoaded: false,
  errorMsg: ''
};

export const postOrder = createAsyncThunk(
  'order/post',
  async (data: string[]) => orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    isOrderLoadedSelector: (state) => state.isOrderLoaded,
    orderSelector: (state) => state.isOrderLoaded
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.isOrderLoaded = true;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.isOrderLoaded = false;
        state.errorMsg = action.error.message || '';
        console.error('postOrder/reject', action.error);
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isOrderLoaded = false;
        state.order = action.payload.order;
      });
  }
});

export const {} = orderSlice.actions;
export const { isOrderLoadedSelector, orderSelector } = orderSlice.selectors;
export default orderSlice.reducer;
