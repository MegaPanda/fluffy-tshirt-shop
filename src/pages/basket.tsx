import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BasketItemUnit from '../components/basketItem';
import EmptyBasketState from '../components/emptyBasketState';
import { BasketState, clearBasket } from '../reducers/basketSlice';

const BasketItems = ({basket_state}: {basket_state: BasketState}) => {
    window.scrollTo({top: 0});
    const dispatch = useDispatch();
    /* conditional redering of whether there's any items in the basket */
    if (basket_state.total_quantity === 0) {
        return (
            <EmptyBasketState />
        )
    } else {
        return (
            <div className="pt-20 pb-10 px-2 w-full max-w-xl">
                <h4 className="px-4 py-2">You have <span className="font-bold">{basket_state.total_quantity}</span> item(s) in the basket.</h4>
                {/* basket items and total price */}
                <div className="divide-y-2 divide-gray-400 divide-solid">
                    {basket_state.items.map((item, index) => 
                        <BasketItemUnit item={item} key={index}/>
                    )}
                    <h4 className="pt-4 pr-2 text-xl text-right font-bold">Subtotal: &nbsp;&nbsp;<span className="text-yellow-700">${basket_state.total_price}</span></h4>
                </div>
                {/* clear basket and checkout*/}
                <div className="sm:px-0 text-left mt-10">
                    <button className="p-1 text-xs font-bold border border-gray-400 rounded-sm hover:border-transparent hover:bg-red-500 hover:text-white" onClick={() => dispatch(clearBasket())}>CLEAR BASKET</button>
                    <Link to="/checkout" className="block py-2 mt-2 text-sm text-center font-bold rounded-sm bg-green-600 hover:bg-green-800 text-white">CHECKOUT</Link>
                </div>
            </div>
        )
    }
};

export default BasketItems;