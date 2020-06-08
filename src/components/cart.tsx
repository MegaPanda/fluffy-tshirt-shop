import React, { useState, useEffect } from 'react';
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
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
    }, []);
    
    const screenSize = () => {
        if (screenWidth > 600) { 
            return {display: "block"};
        } else {
            return {display: "none"};
        }
    };
    
    const [shoppingCartShown, showShoppingCart] = useState(screenSize());

    return (
        <div id="sidebar">
            <button id="shopping-cart-button" onClick={() => showShoppingCart({display: "grid"})}>
                <span id="shopping-cart-icon" className="material-icons">shopping_cart</span>
                <span id="shopping-cart-quantity">{props.total_quantity}</span>
            </button>
            <div  id="cart" style={shoppingCartShown}>
                <div id="cart-close">
                    <button onClick={() => showShoppingCart({display: "none"})}>
                        <span className="material-icons" style={{transform: "rotate(90deg)"}}>expand_less</span>
                    </button>
                </div>
                <div id="cart-content">
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
        </div>
    )
};



export default connect(mapStateToProps, mapDispatchToProps)(Cart);