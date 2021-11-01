import React from 'react';
import BasketIcon from './basketIcon';
import { Link, useLocation } from 'react-router-dom';
import { BasketState } from '../reducers/basketSlice';

const Header = ({basket_state}: {basket_state: BasketState}) => {
    const pawIcon = {
        top: "6px"
    };

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    };

    const location = useLocation();

    return (
        <div className="fixed z-50 sm:px-8 w-screen text-xl sm:text-3xl bg-gray-700 text-gray-300">
            {/* different header layout in checkout page when the basket is not empty
                show navigation to the basket and omit the basket icon */}
            {location.pathname === "/checkout" && basket_state.total_quantity !== 0
                ?   
                <header style={{maxWidth: "1246px"}} className="py-2 sm:py-4 px-1 m-auto flex text-center">
                    <Link to="/basket" className="block p-1 w-14">
                        <p className="material-icons block">arrow_back_ios_new</p>
                        <p className="text-2xs leading-3 font-bold">&nbsp;BASKET</p>
                    </Link>
                    <div className="flex-grow">
                        <span className="material-icons relative cursor-default" style={{top: "4px", fontSize: "36px"}}>pets</span>
                    </div>
                    <div className="w-14"></div>
                </header>
                :
                <header style={{maxWidth: "1246px"}} className="pt-4 px-4 relative m-auto flex justify-between">
                    <Link to="/">
                        <h1 className="font-bold pb-5 sm:pb-4 cursor-pointer flex" onClick={() => scrollTop()}>
                            <span className="material-icons relative pr-2 sm:text-3xl" style={pawIcon}>pets</span>
                            <div className="text-xs tracking-widest leading-none sm:flex sm:text-3xl sm:tracking-normal sm:leading-normal">
                                <p>Fluffy</p>
                                <p className="sm:ml-2">T-Shirt</p>
                                <p className="sm:ml-2">Shop</p>
                            </div>
                        </h1>
                    </Link>
                    <BasketIcon basket_state={basket_state} />
                </header>
            }
        </div>
    )
}

export default Header;