import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

const Footer = ({total_quantity}: {total_quantity: number}) => {
    const location = useLocation();
    return (
        <div className="w-screen sm:px-8 bg-gray-700 text-gray-300">
            {/* different footer layout in checkout page when the basket is not empty
                omit navigation links to prevent user from leaving the page easily */}
            {location.pathname === "/checkout" && total_quantity !== 0
                ?
                <footer style={{maxWidth: "1246px"}} className="m-auto py-2">
                    <div className="text-center">
                        <p className="text-2xs sm:text-base">© FLUFFY T-SHIRT SHOP | ALL RIGHTS RESERVED</p>
                     </div>
                </footer>
                :
                <footer style={{maxWidth: "1246px"}} className="m-auto py-2">
                    <div className="px-6 py-4 text-center">
                        <div>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="inline-block py-2 px-4"><FontAwesomeIcon icon={faFacebookSquare} size="lg"></FontAwesomeIcon></a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-block py-2 px-4"><FontAwesomeIcon icon={faInstagram} size="lg"></FontAwesomeIcon></a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="inline-block py-2 px-4"><FontAwesomeIcon icon={faTwitterSquare} size="lg"></FontAwesomeIcon></a>
                        </div>
                        <div className="text-xs sm:text-base">
                            <Link to="/" className="p-2 sm:px-4 font-bold">HOME</Link>
                            <Link to="/" className="p-2 sm:px-4 font-bold">STORY</Link>
                            <Link to="/" className="p-2 sm:px-4 font-bold">PRODUCTS</Link>
                            <Link to="/" className="p-2 sm:px-4 font-bold">CONTACT</Link>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-2xs">© FLUFFY T-SHIRT SHOP | ALL RIGHTS RESERVED</p>
                    </div>
                </footer>
            }
        </div>
)};

export default Footer;