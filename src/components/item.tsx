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
        <div id="items">
            { products.map( (product, index) => 
                <button key={index} className="modalClick" onClick={() => showModal(product)}>   
                    <div className="item">
                        <div className="item__photo">
                            <img style={{maxWidth: "100%"}} src={product.photo} alt={product.title}></img>
                            <h3 className="item__title">{product.title}</h3>
                        </div>
                        <div>
                            <h3 className="item__price">${product.price}</h3>
                            <div style={{paddingTop: "10px"}}>
                                {Object.entries(product.sizes).map((size, index) => 
                                    size[1] === 0 
                                        ? <span className="item__available-sizes" style={{color: "#bfbfbf"}} key={index}>{size[0]}</span>
                                        : <span className="item__available-sizes" key={index}>{size[0]}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </button>
            )}
            {modalProduct && 
                <ReactModal isOpen={true} onRequestClose={() => showModal(null)} className="modal__content">
                    <button className="modal__close" onClick={() => showModal(null)}>&times;</button>
                    <div className="modal__display">
                        <div>
                            <img className="modal__photo" src={modalProduct.photo} alt={modalProduct.title}></img>
                        </div>
                        <div className="modal__info">
                            <h2>{modalProduct.title}</h2>
                            <h1 className="modal__price">${modalProduct.price}</h1>
                            <div>
                                <h4 style={{margin: "10px 0"}}>SIZE:</h4>
                                <select className="modal__choose-size" onChange={(event) => chooseSize(event.target.value)}>
                                    <option>Please select</option>
                                    {Object.entries(modalProduct.sizes).map((size, index) => 
                                        size[1] === 0
                                            ? <option disabled key={index} value={size[0]}>{size[0]} - Out of stock</option>
                                            : <option key={index} value={size[0]}>{size[0]}</option>
                                        )}
                                </select>
                                <button className="modal__add-to-cart" onClick={() => {
                                    dispatch(addItem(modalProduct, sizeChosen));
                                    showModal(null);
                                }}>ADD TO CART </button>
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