import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { removeItem } from '../actions/cartActions';
import { RootState } from '../reducers/index';
import { CartItem } from '../reducers/cartItemReducer';

const mapStateToProps = (state: RootState) => {
    return {
        items: state.CartItemReducer.items,
        total_quantity: state.CartItemReducer.total_quantity,
        total_price: state.CartItemReducer.total_price
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        removeCartItem: (product: CartItem) => {
            dispatch(removeItem(product));
        }
    }
}

type CartProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Cart = (props: CartProps) => {
    const node = useRef<HTMLDivElement>(null);

    const [shoppingCartShown, showShoppingCart] = useState({display: "none"});

    const handleClick = (event: MouseEvent) => {
        if (node.current?.contains(event.target as Node)) {
            return;
        }
        showShoppingCart({display: "none"});
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    });

    return (
        <div>
            <button id="shopping-cart-button" onClick={() => showShoppingCart({display: "unset"})}>
                <span id="shopping-cart-icon" className="material-icons">shopping_cart</span>
                <span id="shopping-cart-quantity">{props.total_quantity}</span>
            </button>
            <div id="cart" ref={node} style={shoppingCartShown}>
                <h4 className="cart__info">You have {props.total_quantity} item(s) in the cart.</h4>
                <ul>
                {props.items?.map((item, index) => 
                    <li key={index}>
                        <p>{item.title}</p>
                        <div className="cart-item">
                            <img className="cart-item__photo" src={item.photo} alt={item.title}></img>
                            <div className="cart-item__quantity">
                                <span style={{fontSize: "14px"}}>Size:</span>
                                <ul style={{fontSize: "13px"}}>
                                    {item.sizes.map((size, index) => 
                                        <li key={index}>{size.size} x {size.quantity}</li>
                                    )}
                                </ul>
                            </div>
                            <button className="cart-item__remove material-icons" onClick={() => props.removeCartItem(item)}>delete_outline</button>
                        </div>
                    </li>)}
                </ul>
                <h4 className="cart__info">Total price: {props.total_price}</h4>
            </div>
        </div>
    )
};



export default connect(mapStateToProps, mapDispatchToProps)(Cart);