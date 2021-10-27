import React from "react";
import { BasketState } from "../reducers/basketSlice";

const OrderReview = ({basket_state}: {basket_state: BasketState}) => {
    return (
        <div className="sm:w-60 mb-4 sm:pl-4 sm:order-last">
            <h1 className="pl-2 text-xl sm:text-base font-black">Order Review</h1>
            <div className="divide-y divide-gray-300 divide-solid">
                {basket_state.items.map((item, index) => 
                    <div key={index} className="p-2 flex items-stretch">
                        <img className="w-16" src={item.photo} alt={item.title} />
                        <div className="pl-4 flex-grow flex sm:flex-col">
                            <div className="flex-grow">
                                <p className="text-xs font-bold">{item.title}</p>
                                <p className="text-xs">{item.size} x {item.quantity}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</p>    
                            </div>
                        </div>
                    </div>
                )}
                {basket_state.total_price >= 60
                    ? <div>
                        <p className="pt-2 text-right text-sm">Shipping: &nbsp;&nbsp;<span className="font-bold">Free</span></p>
                        <p className="pt-2 text-right font-bold">Total: &nbsp;&nbsp;<span className="text-yellow-700">${basket_state.total_price}</span></p>
                    </div>
                    : <div>
                        <p className="pt-2 text-right text-sm">Shipping: &nbsp;&nbsp;<span className="text-yellow-700 font-bold">$5</span></p>
                        <p className="pt-2 text-right font-bold">Total: &nbsp;&nbsp;<span className="text-yellow-700">${(basket_state.total_price + 5).toFixed(2)}</span></p>
                    </div>
                }
            </div>
        </div>
    )
};

export default OrderReview;