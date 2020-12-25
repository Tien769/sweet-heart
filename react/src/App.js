import { useEffect, useState } from 'react';
import style from './App.module.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/Bill.css';
import './components/Purchase.css';
import './components/Admin.css';
import { getAllProductsAsync } from './lib/backendService';
import { getCartItems } from './lib/backendService';
import { addCartItem } from './lib/backendService';
import PageCart from './components/PageCart';

function App() {

  

  return (
    <div>
        <PageCart></PageCart>
    </div>
);
}
export default App;
