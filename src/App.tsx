import React from 'react';
import Header from './components/header';
import Products from './pages/products';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BasketItems from './pages/basket';
import { useSelector } from 'react-redux';
import { RootState } from './reducers';
import Checkout from './pages/checkout';


export function App() {
  const products_state = useSelector((state: RootState) => state.DisplayProductsReducer);

  const basket_state = useSelector((state: RootState) => state.CartItemReducer);
  return (
      <div>
        <Router basename={`/${process.env.PUBLIC_URL}`}>
          <Header basket_state={basket_state} />
          <Switch>
            <Route exact path="/">
              <Products products={products_state.products} basket_items={basket_state.items} />
            </Route>
            <Route path="/products">
              <Products products={products_state.products} basket_items={basket_state.items} />
            </Route>
            <Route path="/basket">
              <BasketItems basket_state={basket_state} />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
          </Switch>
        </Router>
      </div>
      
    )
};