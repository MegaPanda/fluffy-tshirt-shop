import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UNDER_10, PRICE_ALL, NEW, HIGH_TO_LOW, LOW_TO_HIGH, SIZE_ALL, S, M, L } from '../constants/index';
import Select from 'react-select';
import { FiltersState, filterByPrice, filterBySize, sortProducts, resetFilters } from '../reducers/filtersSlice';
import ReactModal from 'react-modal';

const Filters = ({filters}: {filters: FiltersState}) => {
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
    
    const dispatch = useDispatch();
    const [showFilters, toggleFilters] = useState(false);
    return (
        <div>
            {/* only shows filter toggle menu in smaller screens */}
            <div className="sm:hidden">
                <button type="button" onClick={() => toggleFilters(!showFilters)} className="ml-4">
                    <span className="material-icons text-gray-600 text-3xl">tune</span>
                </button>
                <ReactModal isOpen={showFilters} onRequestClose={() => toggleFilters(!showFilters)}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                        },
                        content: {
                            top: "78px",
                            left: 0,
                            right: 0,
                            bottom: "25%",
                            border: "none",
                            paddingBottom: 0,
                    }}}
                    
                >
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <div className="pb-3 flex justify-between">
                                <span className="font-bold">Filters</span>
                                {Object.values(filters).find(filter => filter !== null)
                                    ? <button onClick={() => dispatch(resetFilters())} className="p-1 text-xs border border-gray-400">RESET FILTERS</button>
                                    : null
                                }
                            </div>
                            <div className="pb-3">
                                <Select
                                    options={SortOptionsArray}
                                    styles={{indicatorSeparator: base => ({...base, display: "none",})}}
                                    placeholder="Sort by"
                                    value={filters.sort ? SortOptionsArray.find(option => option.value === filters.sort) : null}
                                    onChange={(event) => event === null? null : dispatch(sortProducts(event.value))}
                                />
                            </div>
                            <div className="pb-3">
                                <Select
                                    options={PriceOptionsArray}
                                    styles={{indicatorSeparator: base => ({...base, display: "none",})}}
                                    placeholder="Price"
                                    value={filters.price ? PriceOptionsArray.find(option => option.value === filters.price) : null}
                                    onChange={(event) => event === null? null : dispatch(filterByPrice(event.value))}
                                />
                            </div>
                            <div>
                                <Select
                                    options={SizeOptionsArray}
                                    styles={{indicatorSeparator: base => ({...base, display: "none",})}}
                                    placeholder="Size"
                                    value={filters.size ? SizeOptionsArray.find(option => option.value === filters.size) : null}
                                    onChange={(event) => event === null? null : dispatch(filterBySize(event.value))}
                                />
                            </div>
                        </div>
                        <div onClick={() => toggleFilters(!showFilters)} className="text-center cursor-pointer"><span className="material-icons text-6xl text-gray-400">expand_less</span></div>
                    </div>
                </ReactModal>
            </div>
            {/* display filters when screens are bigger than 640px */}
            <div className="hidden sm:block sm:pl-4 sm:pb-4 sm:flex" style={display__border}>
                <div className="pb-3 sm:pb-0 sm:w-48">
                    <Select
                        options={SortOptionsArray}
                        styles={{indicatorSeparator: base => ({...base, display: "none",})}}
                        placeholder="Sort by"
                        value={filters.sort ? SortOptionsArray.find(option => option.value === filters.sort) : null}
                        onChange={(event) => event === null? null : dispatch(sortProducts(event.value))}
                    />
                </div>
                <div className="pb-3 sm:pb-0 sm:w-32 sm:ml-3">
                    <Select
                        options={PriceOptionsArray}
                        styles={{indicatorSeparator: base => ({...base, display: "none",})}}
                        placeholder="Price"
                        value={filters.price ? PriceOptionsArray.find(option => option.value === filters.price) : null}
                        onChange={(event) => event === null? null : dispatch(filterByPrice(event.value))}
                    />
                </div>
                <div className="sm:w-32 sm:ml-3">
                    <Select
                        options={SizeOptionsArray}
                        styles={{indicatorSeparator: base => ({...base, display: "none",})}}
                        placeholder="Size"
                        value={filters.size ? SizeOptionsArray.find(option => option.value === filters.size) : null}
                        onChange={(event) => event === null? null : dispatch(filterBySize(event.value))}
                    />
                </div>
                <div className="ml-8 self-center">
                    {Object.values(filters).find(filter => filter !== null)
                        ? <button onClick={() => dispatch(resetFilters())} className="p-1 text-xs border border-gray-400">RESET FILTERS</button>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Filters;