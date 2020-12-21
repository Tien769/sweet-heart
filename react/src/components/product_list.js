import { useEffect, useState } from 'react';
import Products from './product.js'
import './product.css';
import { getAllProductsAsync } from '../lib/backendService';
import { searchProductAsync } from '../lib/backendService';

function ProductList() {
  const [isType, setIsType] = useState("All");
  const [products, filteredProduct] = useState([]);

  const typeBanh = () => { setIsType("Bánh quy") }
  const typeKeoDeo = () => setIsType("Kẹo dẻo");
  const typeMoChi = () => setIsType("Bánh mochi");
  const typeSnack = () => setIsType("Snack");
  const typeSocola = () => setIsType("Socola");
  const typeAll = () => setIsType("All");

  useEffect(function getType() {
    if (isType === "All") {
      getAllProductsAsync()
        .then(res => {
          //console.log(res)
          filteredProduct(res.product_list)
        })
    }
    else {
      searchProductAsync({
        type: isType,
      })
        .then(res => {
          //console.log(res)
          filteredProduct(res.product_list)
        })
    }
  }, [products])

  return (
    <div className="container">
      <h1>Danh Mục</h1>
      <div className="container-fluid mt-3 mb-3">
        <div className="row g-2">
          <div className="col-md-2">
            <button className="category" type="button" onClick={typeAll}>
              <img className="imgType" src="./logoTypeProduct/mochi.png" alt=""></img>
              <div className="describe" align="center">All</div>
            </button>
          </div>
          <div className="col-md-2">
            <button className="category" type="button" onClick={typeBanh}>
              <img className="imgType" src="./logoTypeProduct/banhquy.png" alt=""></img>
              <div className="describe" align="center">Bánh quy</div>
            </button>
          </div>
          <div className="col-md-2">
            <button className="category" type="button" onClick={typeKeoDeo}>
              <img className="imgType" src="./logoTypeProduct/keo.png" alt=""></img>
              <div className="describe" align="center">Kẹo dẻo</div>
            </button>
          </div>
          <div className="col-md-2">
            <button className="category" type="button" onClick={typeMoChi}>
              <img className="imgType" src="./logoTypeProduct/mochi.png" alt=""></img>
              <div className="describe" align="center">Mochi</div>
            </button>
          </div>
          <div className="col-md-2">
            <button className="category" type="button" onClick={typeSnack}>
              <img className="imgType" src="./logoTypeProduct/mochi.png" alt=""></img>
              <div className="describe" align="center">Snack</div>
            </button>
          </div>
          <div className="col-md-2">
            <button className="category" type="button" onClick={typeSocola}>
              <img className="imgType" src="./logoTypeProduct/mochi.png" alt=""></img>
              <div className="describe" align="center">Socola</div>
            </button>
          </div>
        </div>
      </div>
      <h1>Danh Sách sản phẩm</h1>
      <hr />
      <div className="container-fluid mt-3 mb-3">
      <div className="row g-2" >
        <Products items={products}/>
      </div>
      </div>
      
    </div>
  );
}
export default ProductList;

