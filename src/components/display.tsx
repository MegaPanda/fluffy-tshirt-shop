import React from 'react';
import { displayProducts } from '../actions/productsAction';
import { useDispatch } from 'react-redux';
import { UNDER_10, PRICE_ALL, NEW, HIGH_TO_LOW, LOW_TO_HIGH, SIZE_ALL, S, M, L, SORT, PRICE, SIZE } from '../constants/index';

const display__border = {
    borderBottom: "1px solid #5D6D7E"
}

const filter__options = {
    width: "150px",
    padding: "2px",
    fontSize: "14px"
};

const Display = () => {
    const dispatch = useDispatch();
    return (
        <div className="max-w-screen-xl m-auto pb-6 pt-24 sm:pt-24 flex flex-col text-center sm:flex-row sm:justify-between sm:px-4" style={display__border}>
            <div className="pb-3 sm:pb-0">
                <label>
                    Sort:&nbsp;&nbsp;
                    <select style={filter__options} onChange={(event) => dispatch(displayProducts(SORT, event.target.value))}>
                        <option value={NEW}>What's new</option>
                        <option value={HIGH_TO_LOW}>Price high to low</option>
                        <option value={LOW_TO_HIGH}>Price low to high</option>
                    </select>
                </label>
            </div>
            <div className="pb-3 sm:pb-0">
                <label>
                    Price:&nbsp;&nbsp;
                    <select style={filter__options} onChange={(event) => dispatch(displayProducts(PRICE, event.target.value))}>
                        <option value={PRICE_ALL}>All</option>
                        <option value={UNDER_10}>Under $10</option>    
                    </select> 
                </label>
            </div>
            <div id="filter-size">
                <label>
                    Size:&nbsp;&nbsp;
                    <select style={filter__options} onChange={(event) => dispatch(displayProducts(SIZE, event.target.value))}>
                        <option value={SIZE_ALL}>All</option>
                        <option value={S}>S</option>
                        <option value={M}>M</option>
                        <option value={L}>L</option>   
                    </select> 
                </label>
            </div>
        </div>
    )
}

export default Display;