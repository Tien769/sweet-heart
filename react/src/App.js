import { useEffect, useState } from 'react';
import style from './App.module.scss';
import './components/product.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/product_list.js';

function App() {

  return (
    <div>
      <ProductList></ProductList>
    </div> 
  );
}
export default App;
