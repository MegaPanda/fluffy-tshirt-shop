import React, { Dispatch, SetStateAction } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

const NavBar = ({
    showNavBar,
    setShowNavBar
}: {
    showNavBar: boolean,
    setShowNavBar: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <ReactModal isOpen={showNavBar} onRequestClose={() => setShowNavBar(!showNavBar)}
            style={{
                overlay: {
                    zIndex: 20
                },
                content: {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "70%",
                    border: "none",
                    borderRadius: 0,
                    padding: "40px 0",
                }
            }}
        >
            <div className="h-full flex flex-col gap-6">
                <Link to="/products" onClick={() => setShowNavBar(!showNavBar)} className="block px-8 py-2">MEN</Link>
                <Link to="/products" onClick={() => setShowNavBar(!showNavBar)} className="block px-8 py-2">WOMEN</Link>
                <Link to="/" onClick={() => setShowNavBar(!showNavBar)} className="block px-8 py-2 mt-auto">OUR STORY</Link>
                <Link to="/contact" onClick={() => setShowNavBar(!showNavBar)} className="block px-8 py-2">CONTACT US</Link>
            </div>
        </ReactModal>
    )
};

export default NavBar;