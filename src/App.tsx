import React from 'react';
import './App.css';
import Item  from './components/item';
import Cart from './components/cart';
import Header from './components/header';
import Display from './components/display';

export function App() {
  return (
      <div>
        <Header />
        <div id="content">
          <div id="products">
            <Display />
            <Item />
          </div>
          <Cart />
        </div>
      </div>
    )
};