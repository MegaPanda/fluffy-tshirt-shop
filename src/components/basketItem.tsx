import React from 'react';
import { useDispatch } from 'react-redux';
import { changeItemQuantity, removeItem } from '../actions/basketActions';
import { BasketItem } from '../reducers/basketItemReducer';
import Select from 'react-select';

type selectOption = {
    value: string,
    label: string
} | null;

const BasketItemUnit = ({item}: {item: BasketItem}) => {
    const dispatch = useDispatch();
    const SelectChangeItemQuantity = (event: selectOption, item: BasketItem) => {
        if (event?.value === "0") {
            dispatch(removeItem(item));
        } else {
            dispatch(changeItemQuantity(item, event?.value!))
        }
    };

    const optionArray = [
        { value: '0', label: '0(remove)'},
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' }
    ];

    return (
        <div className="px-2 py-4 flex items-stretch">
            <img className="w-28" src={item.photo} alt={item.title}></img>
            <div className="pl-4 pt-2 flex-grow">
                <p className="font-bold">{item.title}</p>
                <p className="text-xs">Size: {item.size}</p>
                <Select
                    options={optionArray} 
                    value={optionArray.find(e => e.value === item.quantity.toString())}
                    onChange={(event) => SelectChangeItemQuantity(event, item)}
                    className="w-24 pt-6"
                />
            </div>
            <div className="pt-2 flex flex-col justify-between">
                <button className="material-icons self-end" onClick={() => dispatch(removeItem(item))}>delete_outline</button>
                <p className="pb-2 font-semibold">${(item.price*item.quantity).toFixed(2)}</p>
            </div>
        </div>
    )
};

export default BasketItemUnit;