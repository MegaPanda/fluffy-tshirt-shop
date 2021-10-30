import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-screen sm:px-8 bg-gray-700 text-gray-300">
            <footer style={{maxWidth: "1246px"}} className="m-auto py-2">
                <div className="px-8 py-4 flex">
                    <div className="text-xs">
                        <Link to="/" className="block py-1 font-bold">HOME</Link>
                        <Link to="/" className="block py-1 font-bold">STORY</Link>
                        <Link to="/" className="block py-1 font-bold">PRODUCTS</Link>
                        <Link to="/" className="block py-1 font-bold">CONTACT US</Link>
                    </div>
                    <div>
                        <Link to="/"></Link>
                        <Link to="/"></Link>
                        <Link to="/"></Link>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-2xs">© FLUFFY T-SHIRT SHOP | ALL RIGHTS RESERVED</p>
                </div>
            </footer>
        </div>
)};

export default Footer;