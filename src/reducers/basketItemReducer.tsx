import { BasketItemAction } from '../actions/basketActions';
import { ADD_ITEM, CHANGE_ITEM_QUANTITY, CLEAR_BASKET, REMOVE_ITEM } from '../constants/index';

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

export const initialState: BasketState = {
    items: [],
    total_quantity: 0,
    total_price: 0
};

export function CartItemReducer(state = initialState, action: BasketItemAction): BasketState {
    let cartItemsCopy = [...state.items];
    let cartItemIndex = cartItemsCopy.findIndex(item => item.title === action.title && item.size === action.size);
    switch (action.type) {
        case ADD_ITEM:
            if (cartItemIndex !== -1) {
                cartItemsCopy[cartItemIndex].quantity++;
                return {
                    items: [...cartItemsCopy],
                    total_quantity: state.total_quantity + 1,
                    total_price: Number((state.total_price + action.price).toFixed(2))
                }
            } else {
                return {
                    items: [...state.items
                        , {
                            title: action.title,
                            photo: action.photo,
                            price: action.price,
                            size: action.size,
                            quantity: 1
                        }
                    ],
                    total_quantity: state.total_quantity + 1,
                    total_price: Number((state.total_price + action.price).toFixed(2))
                }
            }
        case REMOVE_ITEM:
            let cartItemQuantity = cartItemsCopy[cartItemIndex].quantity;
            return {
                items: cartItemsCopy.filter(item => item.title !== action.title || item.size !== action.size),
                total_quantity: state.total_quantity - cartItemQuantity,
                total_price: Number((state.total_price - action.price*cartItemQuantity).toFixed(2))
            }
        case CHANGE_ITEM_QUANTITY:
            let quantityDifference = cartItemsCopy[cartItemIndex].quantity - action.quantity!;
            cartItemsCopy[cartItemIndex].quantity = action.quantity!;
            return {
                items: cartItemsCopy,
                total_quantity: state.total_quantity - quantityDifference,
                total_price: Number((state.total_price - cartItemsCopy[cartItemIndex].price*quantityDifference).toFixed(2))
            }
        case CLEAR_BASKET:
            return initialState;
        default:
            return state
    }
};