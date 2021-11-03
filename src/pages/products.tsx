import React, { useEffect } from "react";
import Filters from '../components/filters';
import { BasketItem } from "../reducers/basketSlice";
import { FiltersState } from "../reducers/filtersSlice";
import { HIGH_TO_LOW, L, LOW_TO_HIGH, M, NEW, PRICE_ALL, S, SIZE_ALL, UNDER_10 } from "../constants";
import Product from "../components/product";
import { useAppSelector } from "../custom-hooks/useAppSelector";
import useGetData from "../custom-hooks/useGetData";

export type ProductType = {
    index: number,
    photo: string,
    title: string,
    price: number,
    sizes: {
        S: number,
        M: number,
        L: number
    }
};

const Products = ({basket_items}: {basket_items: BasketItem[]}) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const products = useGetData("products");

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
                {products
                    ? sortAndFilter(products, filters).map((product, index) =>
                        <Product product={product} key={index} basket_items={basket_items} />)
                    : <p>Loading...</p>
                }
            </div>
        </div>
    )
};

export default Products;