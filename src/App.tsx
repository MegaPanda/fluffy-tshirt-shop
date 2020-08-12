import React from 'react';
import './App.css';
import Item  from './components/item';
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
        </div>
      </div>
    )
};