import * as constants from '../constants/index';
import { Product } from '../reducers/ProductsReducer';
import { BasketItem } from '../reducers/basketItemReducer';


export interface BasketItemAction {
    type: constants.ADD_ITEM | constants.REMOVE_ITEM | constants.CHANGE_ITEM_QUANTITY | constants.CLEAR_BASKET;
    photo: string;
    title: string;
    price: number;
    size: string;
    quantity?: number;
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

export const removeItem = (product: BasketItem) => {
    return ({
        type: constants.REMOVE_ITEM,
        title: product.title,
        photo: product.photo,
        price: product.price,
        size: product.size
    })
};

export const changeItemQuantity = (product: BasketItem, quantity: string) => {
    return ({
        type: constants.CHANGE_ITEM_QUANTITY,
        title: product.title,
        size: product.size,
        quantity: Number(quantity)
    })
};

export const clearBasket = () => {
    return ({
        type: constants.CLEAR_BASKET
    })
};
