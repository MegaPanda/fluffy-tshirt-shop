import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons"; 
import ImgSlider from "../components/imgSlider";
import summer1 from "../images/summer1.jpg";
import summer2 from "../images/summer2.jpg";
import summer3 from "../images/summer3.jpg";
import winter1 from "../images/winter1.jpg";
import winter2 from "../images/winter2.jpg";
import winter3 from "../images/winter3.jpg";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    
    const imgSummer = [
        {image: summer1}, {image: summer2}, {image: summer3}
    ];
    const imgWinter = [
        {image: winter1}, {image: winter2}, {image: winter3}
    ];

    return (
        <div className="pt-14 w-full max-w-screen-xl">
            <div className="py-4 text-center text-xs sm:text-sm">
                <FontAwesomeIcon icon={faTruck} flip="horizontal" className="text-gray-600" />
                &nbsp;&nbsp;Free Shipping Over $60
            </div>
            <ImgSlider imgData={imgSummer} imgTitle="Summer Party" gridOrder={["order-first", "order-last"]} />
            <section className="w-full h-4"></section>
            <ImgSlider imgData={imgWinter} imgTitle="Winter Snuggle" gridOrder={["order-last", "order-first"]} />
        </div>
    )
};

export default Home;