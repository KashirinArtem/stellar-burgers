import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

export interface IBurgerConstructorState {
    bun: TIngredient | null;
    ingredients: TIngredient[];
}

const initialState: IBurgerConstructorState = {
    bun: null,
    ingredients: []
}
// add+
// down
// up
// delete

export const constructorBurgerSlice = createSlice({
    name: 'constructorBurger',
    initialState,
    selectors: {
        burgerSelector: state => ({bun : state.bun, ingredients: state.ingredients})
    },
    reducers: {
        add: (state, action: PayloadAction<TIngredient>) => {
            const {type} = action.payload;

            if(type === 'bun') state.bun = action.payload;
            else state.ingredients.push(action.payload)
        }
    },
    
});

export const {burgerSelector} = constructorBurgerSlice.selectors;
export const {add} = constructorBurgerSlice.actions;
export default constructorBurgerSlice.reducer;