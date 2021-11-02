import { configureStore } from '@reduxjs/toolkit';
import { basketSlice, BasketState } from './reducers/basketSlice';
import { checkoutSlice } from './reducers/checkoutSlice';
import { filtersSlice } from './reducers/filtersSlice';

const saveBasketState = (state: BasketState) => {
    try {
        const serializedBasketState = JSON.stringify(state);
        localStorage.setItem("basketState", serializedBasketState);
    } catch (err) {
        console.log(err)
    }
};

export const store = configureStore({
    reducer: {
        filters: filtersSlice.reducer,
        basket: basketSlice.reducer,
        checkout: checkoutSlice.reducer,
    },
});

store.subscribe(() => {
    saveBasketState(store.getState().basket)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;