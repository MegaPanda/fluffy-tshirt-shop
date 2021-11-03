import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export interface ImgData {
    image: string
};

const ImgSlider = ({
    imgData,
    imgTitle,
    gridOrder
}: {
    imgData: ImgData[],
    imgTitle: string,
    gridOrder: string[]
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const nextSlide = () => setCurrentIndex(currentIndex === imgData.length - 1 ? 0 : currentIndex + 1);
    const prevSlide = () => setCurrentIndex(currentIndex === 0 ? imgData.length - 1 : currentIndex - 1);
    useEffect(() => {
        let timer = setTimeout(() => {
            setCurrentIndex(currentIndex === imgData.length - 1 ? 0 : currentIndex + 1);
        }, 2500);

        return () => clearTimeout(timer)
    }, [currentIndex, imgData.length]);
    
    return (
        <div className="relative">
            <div className="bg-white sm:grid sm:grid-cols-2 lg:grid-cols-3">
                <div className={"hidden lg:block " + gridOrder[0]}></div>
                <img src={imgData[currentIndex].image} alt="" className="block w-full max-h-96 object-cover object-top" />
                <div className={"hidden sm:flex text-lg italic font-black " + gridOrder[1]}>
                    <Link to="/products" className="m-auto p-2 bg-gray-800 text-white">{imgTitle}</Link>
                </div>
            </div>
            <div className="sm:hidden absolute w-28 px-4 py-2 bg-white text-center italic font-black" style={{bottom: "3rem", left: "calc(50% - 56px)"}}>
                <Link to="/products" >{imgTitle}</Link>
            </div>
            <button type="button" onClick={() => prevSlide()} className="absolute pl-2 text-gray-400 text-opacity-30" style={{top: "calc(50% - 32px)"}}>
                <FontAwesomeIcon icon={faChevronLeft} size="4x" />
            </button>
            <button type="button" onClick={() => nextSlide()} className="absolute pr-2 text-gray-400 text-opacity-30" style={{top: "calc(50% - 32px)", right: 0}}>
                <FontAwesomeIcon icon={faChevronRight} size="4x" />
            </button>
        </div>
    )
};

export default ImgSlider;