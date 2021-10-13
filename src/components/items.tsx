import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Product } from '../reducers/ProductsReducer';
import { addItem } from '../actions/basketActions';
import { BasketItem } from '../reducers/basketItemReducer';

ReactModal.setAppElement('#root');

const Items = ({products, basket_items}: {products: Product[], basket_items: BasketItem[]}) => {
    const dispatch = useDispatch();

    const [modalProduct, showModal] = useState<Product | null>(null);
    const [sizeChosen, chooseSize] = useState<string | null>(null);  
    return (
        <div id="items" className="grid grid-cols-2 p-4 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => 
                <button key={index} className="m-auto cursor-pointer rounded-lg group sm:hover:shadow-xl" onClick={() => showModal(product)}>   
                    <div className="py-4">
                        <div className="overflow-hidden">
                            <img className="transition duration-500 transform sm:group-hover:scale-150" src={product.photo} alt={product.title}></img>
                        </div>
                        <div>
                            <h3 className="my-1 leading-none text-xs sm:text-base text-gray-900 font-extrabold">{product.title}</h3>
                            <h3 className="text-sm sm:text-base text-yellow-700 font-bold">${product.price}</h3>
                        </div>
                    </div>
                </button>
            )}
            {modalProduct && 
                <ReactModal isOpen={true} className="w-4/5 mx-auto mt-24 bg-gray-300 pb-10 overflow-auto" style={{content: {maxHeight: "80vh"}}} 
                onRequestClose={() => {
                    showModal(null);
                    chooseSize(null);
                    }}>
                    <div className="text-right">
                        <button className="text-gray-600 mr-2" onClick={() => showModal(null)}>&times;</button>
                    </div>
                    <div className="w-2/3 sm:w-11/12 m-auto grid sm:grid-cols-2 sm:gap-8">
                        <img className="" src={modalProduct.photo} alt={modalProduct.title}></img>
                        <div className="pt-4 text-left">
                            <h1 className="text-lg text-gray-900 font-extrabold">{modalProduct.title}</h1>
                            <h1 className="text-lg text-yellow-800 font-bold mb-8">${modalProduct.price}</h1>
                            <div className="md:pt-4">
                                <h4 className="text-sm font-bold text-gray-600 mb-1">SIZE:</h4>
                                <select className="w-full border border-black rounded-sm p-1" onChange={(event) => chooseSize(event.target.value)}>
                                    <option>Please select</option>
                                    {Object.entries(modalProduct.sizes).map((size, index) => 
                                        size[1] === 0
                                            ? <option disabled key={index} value={size[0]}>{size[0]} - Out of stock</option>
                                            : <option key={index} value={size[0]}>{size[0]}</option>
                                        )}
                                </select>
                                {sizeChosen === null 
                                    ? <button className="mt-2 w-full text-white font-bold bg-green-600 rounded-sm p-1 cursor-not-allowed">ADD TO BASKET</button>
                                    : <button className="mt-2 w-full text-white font-bold bg-green-600 hover:bg-green-800 rounded-sm p-1" onClick={() => {
                                        if (basket_items.find(item => item.title === modalProduct.title && item.size === sizeChosen)?.quantity === 5) {
                                            alert("Cannot add more of this item to the basket!")
                                        } else {
                                            dispatch(addItem(modalProduct, sizeChosen));
                                            showModal(null);
                                            chooseSize(null);
                                      }}}>ADD TO BASKET </button>
                                }
                            </div>
                        </div> 
                    </div>
                    <div className="modal_description">
                    </div>
                </ReactModal>
            }
        </div>
    )
};

export default Items;