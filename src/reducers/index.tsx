import { combineReducers } from 'redux';
import { CartItemReducer } from './cartItemReducer';
import { DisplayProductsReducer } from './ProductsReducer';

export const rootReducer = combineReducers({
    CartItemReducer,
    DisplayProductsReducer
});

export type RootState = ReturnType<typeof rootReducer>