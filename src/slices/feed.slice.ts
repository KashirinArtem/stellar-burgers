import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('feeds/get', getFeedsApi);

export const getOrder = createAsyncThunk(
  'feed/getOrder',
  async (order: number) => getOrderByNumberApi(order)
);

export interface IFeedState {
  orders: TOrder[];
  isOrdersLoading: boolean;
  order: TOrder | null;
  isOrderLoading: boolean;
  total: number;
  totalToday: number;
}

export const initialState: IFeedState = {
  orders: [],
  isOrdersLoading: false,
  order: null,
  isOrderLoading: false,
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    isOrdersLoadingSelector: (state) => state.isOrdersLoading,
    orderSelector: (state) => state.order,
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isOrdersLoading = false;
        console.error('getFeeds');
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrder.rejected, (state) => {
        state.isOrderLoading = false;
        console.error('getOrder');
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const {
  ordersSelector,
  isOrdersLoadingSelector,
  orderSelector,
  isOrderLoadingSelector,
  totalSelector,
  totalTodaySelector
} = feedSlice.selectors;
export default feedSlice.reducer;
