import React, { useState } from 'react';
import { addItem } from '../actions/cartActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Product } from '../reducers/ProductsReducer';

const mapDispatchToProps = (dispatch: Dispatch) => {
    return ({
        addNewItem: (product: Product | null, size: string | null) => {
            return dispatch(addItem(product, size));
        }
    })
};

interface ModalProps {
    modalProduct: Product | null;
    closeModal: () => void;
    isOpen: boolean;
}

const Modal = (props: ModalProps & ReturnType<typeof mapDispatchToProps>) => {
    const [sizeChosen, chooseSize] = useState<string | null>(null);
    if (props.modalProduct === null) {
        return null;
    } else {
        return (
            <div className="modal">
                <div className="modal__content">
                    <button className="modal__close" onClick={() => props.closeModal()}>&times;</button>
                    <div className="modal__display">
                        <div>
                            <img className="modal__photo" src={props.modalProduct.photo} alt={props.modalProduct.title}></img>
                        </div>
                        <div className="modal__info">
                            <h2>{props.modalProduct.title}</h2>
                            <h1 className="modal__price">${props.modalProduct.price}</h1>
                            <div>
                                <h4 style={{margin: "10px 0"}}>SIZE:</h4>
                                <select className="modal__choose-size" onChange={(event) => chooseSize(event.target.value)}>
                                    <option>Please select</option>
                                    {Object.entries(props.modalProduct.sizes).map((size, index) => 
                                        size[1] === 0
                                            ? <option disabled key={index} value={size[0]}>{size[0]} - Out of stock</option>
                                            : <option key={index} value={size[0]}>{size[0]}</option>
                                        )}
                                </select>
                                <button className="modal__add-to-cart" onClick={() => {
                                    props.addNewItem(props.modalProduct, sizeChosen);
                                    props.closeModal();
                                }}>ADD TO CART </button>
                            </div>
                        </div> 
                    </div>
                    <div className="modal_description">

                    </div>
                </div>
            </div>
        )
    }
};

export default connect(null, mapDispatchToProps)(Modal);