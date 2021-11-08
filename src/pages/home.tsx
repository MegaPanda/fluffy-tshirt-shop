import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons"; 
import ImgSlider, { ImgData } from "../components/imgSlider";
import useGetData from "../custom-hooks/useGetData";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    
    const imgSummer = useGetData<ImgData[]>("homeImgSlider/summerCollection");
    const imgWinter = useGetData<ImgData[]>("homeImgSlider/winterCollection");

    return (
        <div className="pt-14 w-full max-w-screen-xl">
            <div className="py-4 text-center text-xs sm:text-sm">
                <FontAwesomeIcon icon={faTruck} flip="horizontal" className="text-gray-600" />
                &nbsp;&nbsp;Free Shipping Over $60
            </div>
            {imgSummer
                ? <ImgSlider imgData={imgSummer} imgTitle="Summer Party" gridOrder={["order-first", "order-last"]} />
                : <p>Loading...</p>
            }
            <section className="w-full h-4"></section>
            {imgWinter
                ? <ImgSlider imgData={imgWinter} imgTitle="Winter Snuggle" gridOrder={["order-last", "order-first"]} />
                : <p>Loading...</p>
            }
            
        </div>
    )
};

export default Home;