import React, { useState } from 'react';
import BasketIcon from './basketIcon';
import { Link, useLocation } from 'react-router-dom';
import { BasketState } from '../reducers/basketSlice';
import NavBar from './navBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const Header = ({basket_state}: {basket_state: BasketState}) => {
    const location = useLocation();

    const [showNavBar, setShowNavBar] = useState(false);

    return (
        <div className="fixed z-10 sm:px-8 w-screen text-xl bg-gray-700 text-gray-300">
            {/* different header layout in checkout page when the basket is not empty
                show navigation to the basket and omit the basket icon */}
            {location.pathname === "/checkout" && basket_state.total_quantity !== 0
                ?   
                <header style={{maxWidth: "1246px"}} className="py-2 sm:py-4 px-1 m-auto flex text-center">
                    <Link to="/basket" className="block p-1 w-10">
                        <p className="material-icons block">arrow_back_ios_new</p>
                        <p className="text-2xs leading-3 font-bold">&nbsp;BASKET</p>
                    </Link>
                    <div className="flex-grow">
                        <span className="material-icons relative cursor-default" style={{top: "4px", fontSize: "36px"}}>pets</span>
                    </div>
                    <div className="w-14"></div>
                </header>
                :
                <header style={{maxWidth: "1246px"}} className="p-2 relative m-auto flex justify-between">
                    <div className="md:hidden w-10 cursor-pointer text-center flex flex-col justify-center" onClick={() => setShowNavBar(!showNavBar)}>
                        <div><FontAwesomeIcon icon={faPaw} /></div>
                        <p className="text-2xs leading-none">MENU</p>
                    </div>
                    <Link to="/" className="hidden md:flex cursor-pointer items-center">
                        <div><FontAwesomeIcon icon={faPaw} /></div>
                        <p className="ml-2 text-xl font-bold">Fluffy T-Shirt Shop</p>
                    </Link>
                    <div className="md:hidden m-auto text-sm font-bold leading-none">
                        <Link to="/"><p>Fluffy T-Shirt Shop</p></Link>
                    </div>
                    <div className="hidden md:flex ml-auto mr-2 text-sm font-bold gap-2 items-center">
                        <Link to="/" className="px-1 hover:bg-gray-800">STORY</Link>
                        <Link to="/products" className="px-1 hover:bg-gray-800">PRODUCTS</Link> 
                        <Link to="/contact" className="px-1 hover:bg-gray-800">CONTACT</Link>     
                    </div>
                    <BasketIcon basket_state={basket_state} />
                    {showNavBar && <NavBar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />}
                </header>
            }
        </div>
    )
}

export default Header;