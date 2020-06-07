import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { displayProducts } from '../actions/productsAction';
import { connect } from 'react-redux';
import { UNDER_10, PRICE_ALL, NEW, HIGH_TO_LOW, LOW_TO_HIGH, SIZE_ALL, S, M, L, SORT, PRICE, SIZE } from '../constants/index';

const mapDispatchToProps = (dispatch: Dispatch) => {
    return ({
        displayProducts: (category: string, event: ChangeEvent<HTMLSelectElement>) => {
            dispatch(displayProducts(category, event.currentTarget.value))
        }
    })
}

type DisplayProps = ReturnType<typeof mapDispatchToProps>;

const Display = (props: DisplayProps) => {
    return (
        <div id="display">
            <div id="filter-sort">
                <label>
                    Sort:&nbsp;&nbsp;
                    <select className="filter__options" onChange={(event) => props.displayProducts(SORT, event)}>
                        <option value={NEW}>What's new</option>
                        <option value={HIGH_TO_LOW}>Price high to low</option>
                        <option value={LOW_TO_HIGH}>Price low to high</option>
                    </select>
                </label>
            </div>
            <div id="filter-price">
                <label>
                    Price:&nbsp;&nbsp;
                    <select className="filter__options" onChange={(event) => props.displayProducts(PRICE, event)}>
                        <option value={PRICE_ALL}>All</option>
                        <option value={UNDER_10}>Under $10</option>    
                    </select> 
                </label>
            </div>
            <div id="filter-size">
                <label>
                    Size:&nbsp;&nbsp;
                    <select className="filter__options" onChange={(event) => props.displayProducts(SIZE, event)}>
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

export default connect(null, mapDispatchToProps)(Display);