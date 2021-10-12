import React from "react";
import Filters from '../components/filters';
import Items from '../components/items';
import { BasketItem } from "../reducers/basketItemReducer";
import { Product } from "../reducers/ProductsReducer";


const Products = ({products, basket_items}: {products: Product[], basket_items: BasketItem[]}) => {
    return (
        <div className="pt-24 max-w-screen-xl m-auto">
            <Filters />
            <Items products={products} basket_items={basket_items} />
        </div>
    )
};

export default Products;
