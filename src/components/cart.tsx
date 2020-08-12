import React, { CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../actions/cartActions';
import { RootState } from '../reducers/index';

const shopping_cart_quantity_styles = {
    position: "relative",
    width: "16px",
    top: "16px",
    left: "-26px"
} as CSSProperties;

const shopping_cart_styles = {
    top: "61px",
    right: "0",
    width: "350px",
    maxHeight: "70vh",
    borderTop: "none"
} as CSSProperties;

const shopping_cart_triangle_up = {
    width: "0",
    height: "0",
    borderLeft: "14px solid transparent",
    borderRight: "14px solid transparent",
    borderBottom: "12px solid #cbd5e0",
    top: "49px",
    right: "12px"
} as CSSProperties;



const Cart = () => {
    const items = useSelector((state: RootState) => state.CartItemReducer.items);
    const total_quantity = useSelector((state: RootState) => state.CartItemReducer.total_quantity);
    const total_price = useSelector((state: RootState) => state.CartItemReducer.total_price);

    const dispatch = useDispatch();

    return (
        <div className="self-end group pl-2 pb-5 sm:pb-4">
            {/* shopping basket icon and item quantity */}
            <button className="flex">
                <span className="inline-block material-icons text-4xl">shopping_basket</span>
                <span style={shopping_cart_quantity_styles} className="inline-block bg-gray-300 text-blue-900 text-sm font-bold leading-none">{total_quantity}</span>
            </button>
            {/* shopping basket dropdown */}
            {total_quantity === 0 
                ? null
                : <div className="hidden sm:group-hover:block">
                    <div className="absolute" style={shopping_cart_triangle_up} ></div>
                    <div className="absolute border border-gray-500 bg-gray-300 text-gray-800 text-base overflow-auto" style={shopping_cart_styles} >
                        <h4 className="px-4 py-2 bg-gray-400">You have <span className="font-bold">{total_quantity}</span> item(s) in the basket.</h4>
                        <ul className="border divide-y-2 divide-gray-400">
                        {items.map((item, index) => 
                            <li key={index} className="p-4 flex justify-between">
                                <img className="w-32" src={item.photo} alt={item.title}></img>
                                <div className="w-32">
                                    <p className="pb-5 text-lg text-orange-800 font-bold">${item.price}</p>
                                    <p className="text-sm font-bold">{item.title}</p>
                                    <ul className="leading-tight text-sm">
                                        {item.sizes.map((size, index) => 
                                            <li key={index}><span className="inline-block w-4">{size.size}</span> x {size.quantity}</li>
                                        )}
                                    </ul>
                                </div>
                                    <button className="material-icons self-end" onClick={() => dispatch(removeItem(item))}>delete_outline</button>
                            </li>)}
                        </ul>
                        <h4 className="px-4 py-2 font-bold" style={{borderTop: "2px solid #cbd5e0"}}>Total price: <span className="float-right">${total_price}</span></h4>
                        <div className="flex justify-around p-4 bg-gray-400">
                            <button className="w-32 py-4 border border-gray-500 bg-gray-300 hover:bg-gray-400 text-sm font-bold">VIEW BASKET</button>
                            <button className="w-32 py-4 border border-gray-500 bg-green-600 hover:bg-green-700 text-sm text-white font-bold">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};



export default Cart;