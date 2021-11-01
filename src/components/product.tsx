import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { addItem, BasketItem } from '../reducers/basketSlice';
import { useDispatch } from 'react-redux';
import { ProductType } from '../pages/products';

ReactModal.setAppElement('#root');

const Product = ({product, basket_items}: {product: ProductType, basket_items: BasketItem[]}) => {
    const [modalProduct, showModal] = useState<ProductType | null>(null);
    const [sizeChosen, chooseSize] = useState<string | null>(null);  
    const dispatch = useDispatch();
    return (
        <div>
            <button className="m-auto cursor-pointer rounded-lg group sm:hover:shadow-xl" onClick={() => showModal(product)}>   
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
            {modalProduct && 
                <ReactModal isOpen={true} className="w-4/5 max-w-xs sm:max-w-xl m-auto mt-24 sm:mt-40 bg-gray-300 pb-10 overflow-auto" style={{content: {maxHeight: "80vh"}}} 
                onRequestClose={() => {
                    showModal(null);
                    chooseSize(null);
                    }}>
                    <div className="text-right">
                        <button className="text-gray-600 mr-2" onClick={() => showModal(null)}>&times;</button>
                    </div>
                    <div className="w-2/3 sm:w-11/12 m-auto grid sm:grid-cols-2 sm:gap-8">
                        <img className="" src={modalProduct.photo} alt={modalProduct.title}></img>
                        <div className="pt-4 text-left flex flex-col justify-between">
                            <div>
                                <h1 className="text-lg text-gray-900 font-extrabold">{modalProduct.title}</h1>
                                <h1 className="text-lg text-yellow-800 font-bold mb-8">${modalProduct.price}</h1>
                            </div>
                            <div className="md:pt-4">
                                <h4 className="text-sm font-bold text-gray-600 mb-1">SIZE:</h4>
                                <select className="w-full border border-black rounded-sm p-1" onChange={(event) => chooseSize(event.target.value)}>
                                    <option value="none">Please select</option>
                                    {Object.entries(modalProduct.sizes).map((size, index) => 
                                        size[1] === 0
                                            ? <option disabled key={index} value={size[0]}>{size[0]} - Out of stock</option>
                                            : <option key={index} value={size[0]}>{size[0]}</option>
                                        )}
                                </select>
                                {sizeChosen === null || sizeChosen === "none"
                                    ? <button className="mt-2 w-full text-gray-400 font-bold bg-gray-600 rounded-sm p-1 cursor-default">ADD TO BASKET</button>
                                    : <button className="mt-2 w-full text-white font-bold bg-green-600 hover:bg-green-800 rounded-sm p-1" onClick={() => {
                                        if (basket_items.find(item => item.title === modalProduct.title && item.size === sizeChosen)?.quantity === 5) {
                                            alert("Cannot add more of this item to the basket!")
                                        } else {
                                            dispatch(addItem({...modalProduct, size: sizeChosen}));
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

export default Product;