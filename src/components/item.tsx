import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/index';
import { Product } from '../reducers/ProductsReducer';
import { addItem } from '../actions/cartActions';

ReactModal.setAppElement('#root');

const Item = () => {
    const products = useSelector((state: RootState) => state.DisplayProductsReducer.products);
    const dispatch = useDispatch();

    const [modalProduct, showModal] = useState<Product | null>(null);
    
    const [sizeChosen, chooseSize] = useState<string | null>(null);
    
    return (
        <div id="items" className="grid grid-cols-2 p-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 max-w-screen-xl m-auto">
            { products.map( (product, index) => 
                <button key={index} className="m-auto cursor-pointer" onClick={() => showModal(product)}>   
                    <div className="py-4">
                        <img src={product.photo} alt={product.title}></img>
                        <div>
                            <h3 className="my-3 h-8 leading-none text-gray-900 font-bold">{product.title}</h3>
                            <h3 className="text-orange-800 font-bold">${product.price}</h3>
                        </div>
                    </div>
                </button>
            )}
            {modalProduct && 
                <ReactModal isOpen={true} className="w-4/5 mx-auto mt-20 bg-indigo-100 pb-10 border border-gray-500 overflow-auto" style={{content: {maxHeight: "80vh"}}} 
                onRequestClose={() => {
                    showModal(null);
                    chooseSize(null);
                    }}>
                    <div className="text-right">
                        <button className="text-2xl text-gray-600 mr-2" onClick={() => showModal(null)}>&times;</button>
                    </div>
                    <div className="w-2/3 md:w-11/12 m-auto grid md:grid-cols-2 md:gap-8">
                        <img className="" src={modalProduct.photo} alt={modalProduct.title}></img>
                        <div className="pt-8 text-left">
                            <h1 className="text-xl text-gray-900 font-bold">{modalProduct.title}</h1>
                            <h1 className="text-2xl text-orange-800 font-bold my-6">${modalProduct.price}</h1>
                            <div className="md:pt-4">
                                <h4 className="font-bold mb-2">SIZE:</h4>
                                <select className="w-full border border-black rounded-sm p-1" onChange={(event) => chooseSize(event.target.value)}>
                                    <option>Please select</option>
                                    {Object.entries(modalProduct.sizes).map((size, index) => 
                                        size[1] === 0
                                            ? <option disabled key={index} value={size[0]}>{size[0]} - Out of stock</option>
                                            : <option key={index} value={size[0]}>{size[0]}</option>
                                        )}
                                </select>
                                {sizeChosen === null 
                                    ? <button className="mt-4 w-full text-white font-bold bg-green-600 rounded-sm p-1 cursor-not-allowed">ADD TO BASKET</button>
                                    : <button className="mt-4 w-full text-white font-bold bg-green-600 hover:bg-green-700 rounded-sm p-1" onClick={() => {
                                        dispatch(addItem(modalProduct, sizeChosen));
                                        showModal(null);
                                        chooseSize(null);
                                      }}>ADD TO BASKET </button>
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

export default Item;