import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('feeds/get', async () =>
  getFeedsApi()
);

export interface IFeedState {
  orders: TOrder[];
  isOrdersLoading: boolean;
}

export const initialState: IFeedState = {
  orders: [],
  isOrdersLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    isOrdersLoadingSelector: (state) => state.isOrdersLoading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isOrdersLoading = false;
        console.log('getFeeds');
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload.orders;
      });
  }
});

export const { ordersSelector, isOrdersLoadingSelector } = feedSlice.selectors;
export default feedSlice.reducer;
