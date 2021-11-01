import React, { useEffect } from "react";
import Filters from '../components/filters';
import { BasketItem } from "../reducers/basketSlice";
import gsd from '../images/gsd.jpg';
import husky from '../images/husky.jpg';
import golden from '../images/golden.jpg';
import border from '../images/border.jpg';
import pug from '../images/pug.jpg';
import { FiltersState } from "../reducers/filtersSlice";
import { HIGH_TO_LOW, L, LOW_TO_HIGH, M, NEW, PRICE_ALL, S, SIZE_ALL, UNDER_10 } from "../constants";
import Product from "../components/product";
import { useAppSelector } from "../custom-hooks/useAppSelector";

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

export type ProductType = typeof products[0];


const Products = ({basket_items}: {basket_items: BasketItem[]}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const sortAndFilter = (products: ProductType[], filters: FiltersState) => {
        for (const filter of Object.values(filters)) {
            switch (filter) {
            case PRICE_ALL:
                break
            case UNDER_10:
                products = products.filter(product => product.price < 10);
                break
            case SIZE_ALL:
                break
            case S:
                products = products.filter(product => product.sizes.S > 0);
                break
            case M:
                products = products.filter(product => product.sizes.M > 0);
                break
            case L:
                products = products.filter(product => product.sizes.L > 0);
                break
            case NEW:
                products = [...products].sort((a, b) => a.index - b.index);
                break
            case LOW_TO_HIGH:
                products = [...products].sort((a, b) => a.price - b.price);
                break
            case HIGH_TO_LOW:
                products = [...products].sort((a, b) => b.price - a.price);
                break
            }
        }
        return products;
    };

    const filters = useAppSelector((state) => state.filters);
    
    return (
        <div className="pt-14 w-full max-w-screen-xl">
            <Filters filters={filters}/>
            <div id="items" className="grid grid-cols-2 p-4 pt-0 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {sortAndFilter(products, filters).map((product, index) =>
                    <Product product={product} key={index} basket_items={basket_items} />
                )}
            </div>
        </div>
    )
};

export default Products;