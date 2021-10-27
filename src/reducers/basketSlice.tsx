import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BasketState {
    items: BasketItem[];
    total_quantity: number;
    total_price: number;
};

export interface BasketItem {
    title: string;
    photo: string;
    price: number;
    size: string;
    quantity: number;
};

const initialState: BasketState = {
    items: [],
    total_quantity: 0,
    total_price: 0
};

export interface BasketAction {
    photo: string,
    title: string;
    price: number;
    size: string;
    quantity?: number;
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<BasketAction>) => {
            let basketItemIndex = state.items.findIndex(item => item.title === action.payload.title && item.size === action.payload.size);
            if (basketItemIndex !== -1) {
                state.items[basketItemIndex].quantity++;
                state.total_quantity++;
                state.total_price = Number((state.total_price + action.payload.price).toFixed(2));
            } else {
                state.items.push({
                    title: action.payload.title,
                    photo: action.payload.photo,
                    price: action.payload.price,
                    size: action.payload.size,
                    quantity: 1
                });
                state.total_quantity++;
                state.total_price = Number((state.total_price + action.payload.price).toFixed(2));
            }
        },
        removeItem: (state, action: PayloadAction<BasketAction>) => {
            let basketItem = state.items.find(item => item.title === action.payload.title && item.size === action.payload.size) as BasketItem;
            state.items = state.items.filter(item => item.title !== action.payload.title || item.size !== action.payload.size);
            state.total_quantity -= basketItem.quantity;
            state.total_price = Number((state.total_price - (basketItem.price * basketItem.quantity)).toFixed(2));
        },
        changeItemQuantity: (state, action: PayloadAction<BasketAction>) => {
            let basketItemIndex = state.items.findIndex(item => item.title === action.payload.title && item.size === action.payload.size);
            let quantityDifference = state.items[basketItemIndex].quantity - action.payload.quantity!;
            state.items[basketItemIndex].quantity = action.payload.quantity!;
            state.total_quantity = state.total_quantity - quantityDifference;
            state.total_price = Number((state.total_price - quantityDifference * action.payload.price).toFixed(2));
        },
        clearBasket: state => initialState,
    },
});

export const { addItem, removeItem, changeItemQuantity, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;