import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IBurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};
// add+
// down+
// up+
// delete

export const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    burgerSelector: (state) => state
  },
  reducers: {
    add: (state, action: PayloadAction<TIngredient>) => {
      const { type } = action.payload;

      if (type === 'bun') state.bun = action.payload;
      else {
        state.ingredients.push({
          ...action.payload,
          id: Date.now().toString()
        });
      }
    },
    moveUp: (state, action: PayloadAction<number>) => {
      // изменяет положение элемента в массиве относительно текущего на -1(вверх)
      const index = action.payload;
      state.ingredients.splice(
        index - 1,
        0,
        state.ingredients.splice(index, 1)[0]
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      // изменяет положение элемента в массиве относительно текущего на +1(вниз)
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
