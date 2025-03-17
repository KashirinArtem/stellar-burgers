import { createSlice, PayloadAction, PrepareAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import reducer from './ingredients.slice';
import { v4 as uuid } from 'uuid';

export interface IBurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    burgerSelector: (state) => state
  },
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') state.bun = action.payload;
        else state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(
        index - 1,
        0,
        state.ingredients.splice(index, 1)[0]
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(
        index + 1,
        0,
        state.ingredients.splice(index, 1)[0]
      );
    },
    deleteItem: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing._id !== action.payload._id
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { burgerSelector } = constructorBurgerSlice.selectors;
export const { add, moveUp, moveDown, deleteItem, clearConstructor } =
  constructorBurgerSlice.actions;
export default constructorBurgerSlice.reducer;
