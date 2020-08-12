import React from 'react';
import Cart from './cart';

const pawIcon = {
    top: "3px"
};

const Header = () => {
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    };

    return (
        <div className="fixed pt-5 px-8 sm:px-8 sm:pt-4 w-screen text-xl sm:text-3xl bg-blue-900 text-gray-300">
            <header className="relative max-w-screen-xl m-auto flex justify-between">
                <h1 className="font-bold pb-5 sm:pb-4 cursor-pointer" onClick={() => scrollTop()}>
                    <span className="material-icons relative pr-2 sm:text-3xl" style={pawIcon}>pets</span>Fluffy T-Shirt Shop
                </h1>
                <Cart />
            </header>
        </div>
    )
}

export default Header;