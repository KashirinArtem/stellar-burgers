import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredients from '../slices/ingredients.slice';
import constructorBurger from '../../src/slices/constructorBurger.slice';
import feed from '../../src/slices/feed.slice';
import auth from '../../src/slices/auth.slice';
import order from '../../src/slices/order.slice';

export const rootReducer = combineReducers({
  ingredients,
  constructorBurger,
  feed,
  auth,
  order
});


const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
