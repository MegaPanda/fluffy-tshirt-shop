import React from 'react';
import { displayProducts } from '../actions/productsAction';
import { useDispatch } from 'react-redux';
import { UNDER_10, PRICE_ALL, NEW, HIGH_TO_LOW, LOW_TO_HIGH, SIZE_ALL, S, M, L, SORT, PRICE, SIZE } from '../constants/index';
import Select from 'react-select';

const display__border = {
    borderBottom: "1px solid #5D6D7E"
}

const SortOptionsArray = [
    { value: NEW, label: 'What\'s new' },
    { value: HIGH_TO_LOW, label: 'Price high to low' },
    { value: LOW_TO_HIGH, label: 'Price low to high' }
];

const PriceOptionsArray = [
    { value: PRICE_ALL, label: 'All' },
    { value: UNDER_10, label: 'Under $10' }
];

const SizeOptionsArray = [
    { value: SIZE_ALL, label: 'All' },
    { value: S, label: 'S' },
    { value: M, label: 'M' },
    { value: L, label: 'L' }
];

const Filters = () => {
    const dispatch = useDispatch();
    return (
        <div className="max-w-screen-xl m-auto z-0 px-4 pb-6 flex flex-col sm:flex-row" style={display__border}>
            <div className="pb-3 sm:pb-0 sm:w-32">
                <Select
                    options={SortOptionsArray}
                    placeholder="Sort by"
                    onChange={(event) => event === null? null : dispatch(displayProducts(SORT, event.value))}
                />
            </div>
            <div className="pb-3 sm:pb-0 sm:w-32 sm:ml-3">
                <Select
                    options={PriceOptionsArray}
                    placeholder="Price"
                    onChange={(event) => event === null? null : dispatch(displayProducts(PRICE, event.value))}
                />
            </div>
            <div className="sm:w-32 sm:ml-3">
                <Select
                    options={SizeOptionsArray}
                    placeholder="Size"
                    onChange={(event) => event === null? null : dispatch(displayProducts(SIZE, event.value))}
                />
            </div>
        </div>
    )
}

export default Filters;