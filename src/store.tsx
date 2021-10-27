import { configureStore } from '@reduxjs/toolkit';
import { basketSlice } from './reducers/basketSlice';
import { checkoutSlice } from './reducers/checkoutSlice';
import { filtersSlice } from './reducers/filtersSlice';

export const store = configureStore({
    reducer: {
        filters: filtersSlice.reducer,
        basket: basketSlice.reducer,
        checkout: checkoutSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;