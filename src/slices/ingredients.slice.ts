import { getIngredientsApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IIngredientsState {
  isIngredientsLoaded: boolean;
  ingredients: TIngredient[];
  error: null | string;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  isIngredientsLoaded: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    isIngredientsLoadedSelector: (state) => state.isIngredientsLoaded
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoaded = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoaded = false;
        state.error = action.error.message || null;
        console.error('getIngredients');
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoaded = false;
        state.ingredients = action.payload;
      });
  }
});

export const { ingredientsSelector, isIngredientsLoadedSelector } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
