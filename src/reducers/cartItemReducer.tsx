import { CartItemAction } from '../actions/cartActions';
import { ADD_ITEM, REMOVE_ITEM } from '../constants/index';

export interface CartState {
    items: CartItem[];
    total_quantity: number;
    total_price: number;
};

interface Size {
    size: string;
    quantity: number;
}

export interface CartItem {
    title: string;
    photo: string;
    price: number;
    sizes: Size[];
};

export const initialState: CartState = {
    items: [],
    total_quantity: 0,
    total_price: 0
};

export function CartItemReducer(state = initialState, action: CartItemAction): CartState {
    let cartItemsCopy = [...state.items];
    let cartItemIndex = cartItemsCopy.findIndex(item => item.title === action.title);
    let alreadyInCart = false;
    switch (action.type) {
        case ADD_ITEM:
            if (cartItemIndex !== -1) {
                cartItemsCopy[cartItemIndex].sizes.forEach(size => {
                    if (size.size === action.size) {
                        size.quantity++;
                        alreadyInCart = true;
                    }
                })
                if (!alreadyInCart) {
                    cartItemsCopy[cartItemIndex].sizes.push({
                        size: action.size,
                        quantity: 1
                    });
                }
                alreadyInCart = false;
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
                            sizes: [{
                                size: action.size,
                                quantity: 1
                            }]
                        }
                    ],
                    total_quantity: state.total_quantity + 1,
                    total_price: Number((state.total_price + action.price).toFixed(2))
                }
            }
        case REMOVE_ITEM:
            let cartItemQuantity = cartItemsCopy[cartItemIndex].sizes.reduce((sum, size) => sum + size.quantity, 0)
            return {
                items: cartItemsCopy.filter(item => item.title !== action.title),
                total_quantity: state.total_quantity - cartItemQuantity,
                total_price: Number((state.total_price - action.price*cartItemQuantity).toFixed(2))
            }
        default:
            return state
    }
};