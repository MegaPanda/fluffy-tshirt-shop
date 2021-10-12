import React from 'react';
import BasketIcon from './basketIcon';
import { Link } from 'react-router-dom';
import { BasketState } from '../reducers/basketItemReducer';

const Header = ({basket_state}: {basket_state: BasketState}) => {
    const pawIcon = {
        top: "6px"
    };

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    };

    return (
        <div className="fixed z-50 pt-4 px-4 sm:px-8 w-screen text-xl sm:text-3xl bg-gray-700 text-gray-300">
            <header style={{maxWidth: "1246px"}} className="relative m-auto flex justify-between">
                <Link to="/products">
                    <h1 className="font-bold pb-5 sm:pb-4 cursor-pointer flex" onClick={() => scrollTop()}>
                        <span className="material-icons relative pr-2 sm:text-3xl" style={pawIcon}>pets</span>
                        <div className="text-sm tracking-widest leading-none sm:flex sm:text-3xl sm:tracking-normal sm:leading-normal">
                            <p>Fluffy</p>
                            <p className="sm:ml-2">T-Shirt</p>
                            <p className="sm:ml-2">Shop</p>
                        </div>
                    </h1>
                </Link>
                <BasketIcon basket_state={basket_state} />
            </header>
        </div>
    )
}

export default Header;