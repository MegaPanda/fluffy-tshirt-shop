import React, { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { BasketState, removeItem } from '../reducers/basketSlice';

const BasketIcon = ({basket_state}: {basket_state: BasketState}) => {
    const shopping_basket_quantity_styles = {
        position: "relative",
        width: "16px",
        height: "12px",
        top: "15px",
        right: "-23px"
    } as CSSProperties;
    
    const shopping_basket_styles = {
        top: "76.67px",
        right: "2px",
        width: "350px",
        maxHeight: "70vh",
        zIndex: 999
    } as CSSProperties;
    
    const shopping_basket_triangle_up = {
        width: "0",
        height: "0",
        borderLeft: "14px solid transparent",
        borderRight: "14px solid transparent",
        borderBottom: "12px solid #9CA3AF",
        top: "65px",
        right: "16px"
    } as CSSProperties;

    const dispatch = useDispatch();
    const location = useLocation();

    return (
        <div id="basket-icon" className="self-end group pl-2 pb-5 sm:pb-4">
            {/* shopping basket icon and item quantity */}
            {basket_state.total_quantity !== 0 && window.innerWidth >= 768
                // prevent redirection from clicking the icon in bigger screens //
                // user should use the dropdown menu to navigate instead //
                ? <Link to="/basket" className="flex text-center sm:pb-1 pointer-events-none">
                    <span style={shopping_basket_quantity_styles} className="inline-block bg-gray-300 text-blue-900 text-xs font-bold leading-none z-10">{basket_state.total_quantity}</span>
                    <span className="inline-block material-icons text-3xl z-0">shopping_basket</span>
                </Link>
                : <Link to="/basket" className="flex text-center sm:pb-1">
                    <span style={shopping_basket_quantity_styles} className="inline-block bg-gray-300 text-blue-900 text-xs font-bold leading-none z-10">{basket_state.total_quantity}</span>
                    <span className="inline-block material-icons text-3xl z-0">shopping_basket</span>
                </Link>
            }
            {location.pathname === "/basket" || location.pathname === "/checkout" 
                ? document.getElementById("basket-icon")?.classList.remove("group")
                : document.getElementById("basket-icon")?.classList.add("group")
            }
            {/* shopping basket dropdown */}
            {basket_state.total_quantity === 0 
                ? null
                : <div className="hidden md:group-hover:block">
                    <div className="absolute" style={shopping_basket_triangle_up}></div>
                    <div className="absolute bg-gray-300 text-gray-900 text-base overflow-auto group-hover:animate-slideDown" style={shopping_basket_styles} >
                        <h4 className="px-4 py-2 bg-gray-400">You have <span className="font-bold">{basket_state.total_quantity}</span> item(s) in the basket.</h4>
                        {/* set the width as the same to the containing div so the scrollbar won't squeeze */}
                        <ul className="border divide-y-2 divide-gray-400" style={{width: '350px'}}>
                        {basket_state.items.map((item, index) => 
                            <li key={index} className="pl-4 py-4 pr-6 flex justify-between">
                                <img className="w-32" src={item.photo} alt={item.title}></img>
                                <div className="w-32">
                                    <p className="text-xs font-bold">{item.title}</p>
                                    <p className="text-xs">{item.size} x {item.quantity}</p>
                                    <p className="pt-5 text-xs font-bold">${Number(item.price*item.quantity).toFixed(2)}</p>
                                </div>
                                    <button className="material-icons self-end" onClick={() => dispatch(removeItem(item))}>delete_outline</button>
                            </li>)}
                        </ul>
                        <h4 className="pl-4 py-3 pr-6 font-bold border-t-2 border-gray-400" style={{width: '350px'}}>Subtotal: <span className="float-right text-yellow-800">${basket_state.total_price}</span></h4>
                        <div className="flex justify-around p-4 bg-gray-400 text-center" style={{width: '350px'}}>
                            <Link to="/basket" className="w-32 py-4 border border-gray-500 rounded-sm bg-gray-300 hover:bg-gray-700 hover:text-gray-300 text-sm font-bold">VIEW BASKET</Link>
                            <Link to="/checkout" className="w-32 py-4 border border-gray-500 rounded-sm bg-green-600 hover:bg-green-800 text-sm text-white font-bold">CHECKOUT</Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
};



export default BasketIcon;