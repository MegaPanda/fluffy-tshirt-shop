import React from 'react';
import Header from './components/header';
import Products from './pages/products';
import { HashRouter, Route, Switch } from "react-router-dom";
import BasketItems from './pages/basket';
import Checkout from './pages/checkout';
import { useAppSelector } from './custom-hooks/useAppSelector';
import Footer from './components/footer';


export function App() {
  const basket_state = useAppSelector(state => state.basket)
  return (
      <div className="min-h-screen flex flex-col justify-between items-center">
        <HashRouter>
          <Header basket_state={basket_state} />
            <Switch>
              <Route exact path="/">
                <Products basket_items={basket_state.items} />
              </Route>
              <Route path="/products">
                <Products basket_items={basket_state.items} />
              </Route>
              <Route path="/basket">
                <BasketItems basket_state={basket_state} />
              </Route>
              <Route path="/checkout">
                <Checkout basket_state={basket_state} />
              </Route>
            </Switch>
          <Footer total_quantity={basket_state.total_quantity} />
        </HashRouter>
      </div>
      
    )
};