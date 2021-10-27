import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
    price: string | null,
    size: string | null,
    sort: string | null   
};

const initialState: FiltersState = {
    price: null,
    size: null,
    sort: null
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterByPrice: (state, action: PayloadAction<string>) => {
            state.price = action.payload
        },
        filterBySize: (state, action: PayloadAction<string>) => {
            state.size = action.payload
        },
        sortProducts: (state, action: PayloadAction<string>) => {
            state.sort = action.payload
        },
        resetFilters: (state) => initialState,
    },
});

export const { filterByPrice, filterBySize, sortProducts, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;