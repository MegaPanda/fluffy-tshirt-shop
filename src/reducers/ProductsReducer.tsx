import { displayProductsAction } from "../actions/productsAction";
import { NEW, LOW_TO_HIGH, HIGH_TO_LOW, PRICE_ALL, UNDER_10, SIZE_ALL, S, M, L, SORT, PRICE, SIZE } from "../constants/index";
import gsd from '../images/gsd.jpg';
import husky from '../images/husky.jpg';
import golden from '../images/golden.jpg';
import border from '../images/border.jpg';
import pug from '../images/pug.jpg';

const products = [
    {
        index: 0,
        photo: gsd,
        title: "German Shepherd",
        price: 19.99,
        sizes: {
            S: 0,
            M: 5,
            L: 3
        }
    },
    {
        index: 4,
        photo: husky,
        title: "Husky",
        price: 14.99,
        sizes: {
            S: 2,
            M: 5,
            L: 3
        }
    },
    {
        index: 2,
        photo: golden,
        title: "Golden Retriever",
        price: 19.99,
        sizes: {
            S: 2,
            M: 0,
            L: 3
        }
    },
    {
        index: 3,
        photo: border,
        title: "Border Collie",
        price: 9.99,
        sizes: {
            S: 2,
            M: 5,
            L: 3
        }
    },
    {
        index: 1,
        photo: pug,
        title: "Pug",
        price: 6.99,
        sizes: {
            S: 2,
            M: 5,
            L: 0
        }
    }
];

const filters = {
    PRICE: PRICE_ALL,
    SIZE: SIZE_ALL,
    SORT: NEW
};

export type Product = typeof products[0];
  
export function DisplayProductsReducer(state = {products, filters}, action: displayProductsAction) {
    switch (action.category) {
        case PRICE:
            filters.PRICE = action.type;
            break
        case SIZE:
            filters.SIZE = action.type;
            break
        case SORT:
            filters.SORT = action.type;
            break
    };

    let producstsCopy = products
    function sortAndFilter (criterion: string) {
        switch (criterion) {
            case PRICE_ALL:
                break
            case UNDER_10:
                producstsCopy = producstsCopy.filter(product => product.price < 10);
                break
            case SIZE_ALL:
                break
            case S:
                producstsCopy = producstsCopy.filter(product => product.sizes.S > 0);
                break
            case M:
                producstsCopy = producstsCopy.filter(product => product.sizes.M > 0);
                break
            case L:
                producstsCopy = producstsCopy.filter(product => product.sizes.L > 0);
                break
            case NEW:
                producstsCopy = [...producstsCopy].sort((a, b) => a.index - b.index);
                break
            case LOW_TO_HIGH:
                producstsCopy = [...producstsCopy].sort((a, b) => a.price - b.price);
                break
            case HIGH_TO_LOW:
                producstsCopy = [...producstsCopy].sort((a, b) => b.price - a.price);
                break
        }
    }
    Object.values(filters).forEach(filter => sortAndFilter(filter));
    
    return ({
        products: producstsCopy,
        filters: state.filters
    })
};

