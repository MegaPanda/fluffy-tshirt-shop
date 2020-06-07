import * as constants from '../constants/index';
import { Product } from '../reducers/ProductsReducer';
import { CartItem } from '../reducers/cartItemReducer';


export interface CartItemAction {
    type: constants.ADD_ITEM | constants.REMOVE_ITEM;
    photo: string;
    title: string;
    price: number;
    size: string;
};

export const addItem = (product: Product | null, size: string | null) => {
    return ({
        type: constants.ADD_ITEM,
        title: product?.title,
        photo: product?.photo,
        price: product?.price,
        size: size
    });
};

export const removeItem = (product: CartItem) => {
    return ({
        type: constants.REMOVE_ITEM,
        title: product.title,
        photo: product.photo,
        price: product.price
    })
}