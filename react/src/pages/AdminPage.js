import { useEffect, useReducer, useRef, useState } from 'react';
import { formatPrice } from '../components/ProductCard';
import {
  addProduct,
  getAllOrders,
  getAllProductsAsync,
  getProduct,
  getProductImageUrl,
  removeOrder,
  removeProduct,
} from '../lib/backendService';
import styles from './AdminPage.module.scss';

const ProductList = ({ products }) => {
  const [mode, setMode] = useState('View');
  const fileRef = useRef();
  const [newProdValues, updateNewProdValues] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'name':
          return { ...state, name: action.value };
        case 'type':
          return { ...state, type: action.value };
        case 'price':
          return { ...state, price: action.value };
        default:
          return;
      }
    },
    {
      name: '',
      type: 'Bánh quy',
      price: 0.0,
    }
  );

  // Add new product
  const submitHandler = e => {
    e.preventDefault();

    if (fileRef.current) {
      addProduct(newProdValues, fileRef.current.files[0]);
    }
  };

  if (mode === 'View')
    return (
      <div id={styles.ProdList}>
        <div className={styles.flex}>
          <h2>Danh sách sản phẩm</h2>
          <button onClick={() => setMode('Add')}>+ Thêm</button>
        </div>
        <hr />
        {Array.isArray(products) &&
          products.map(p => (
            <>
              <div key={p.product_id} className={styles.flex}>
                <div>
                  <img src={getProductImageUrl(p.img)} alt='' />
                </div>
                <div>{p.type}</div>
                <div>{p.name}</div>
                <div>{formatPrice(parseFloat(p.price) * 1000)} đ</div>
                <div>
                  <button className={styles.dangerous} onClick={() => removeProduct(p)}>
                    X
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    );

  if (mode === 'Add')
    return (
      <div id={styles.ProdList}>
        <div className={styles.flex}>
          <button onClick={() => setMode('View')} className={styles.prev}>
            Trở lại{' '}
          </button>
          <h2>Thêm sản phẩm</h2>
        </div>
        <hr />
        <form onSubmit={submitHandler}>
          <div id={styles.NewType}>
            <div>
              <input
                type='radio'
                name='type'
                value='Bánh quy'
                checked={'Bánh quy' === newProdValues.type}
                onChange={e => updateNewProdValues({ type: 'type', value: e.target.value })}
              />
              <label>Bánh quy</label>
            </div>
            <div>
              <input
                type='radio'
                name='type'
                value='Snack'
                checked={'Snack' === newProdValues.type}
                onChange={e => updateNewProdValues({ type: 'type', value: e.target.value })}
              />
              <label>Snack</label>
            </div>
            <div>
              <input
                type='radio'
                name='type'
                value='Kẹo dẻo'
                checked={'Kẹo dẻo' === newProdValues.type}
                onChange={e => updateNewProdValues({ type: 'type', value: e.target.value })}
              />
              <label>Kẹo dẻo</label>
            </div>
            <div>
              <input
                type='radio'
                name='type'
                value='Bánh mochi'
                checked={'Bánh mochi' === newProdValues.type}
                onChange={e => updateNewProdValues({ type: 'type', value: e.target.value })}
              />
              <label>Bánh mochi</label>
            </div>
            <div>
              <input
                type='radio'
                name='type'
                value='Socola'
                checked={'Socola' === newProdValues.type}
                onChange={e => updateNewProdValues({ type: 'type', value: e.target.value })}
              />
              <label>Socola</label>
            </div>
          </div>
          <div>
            <label htmlFor={styles.NewName}>Tên sản phẩm</label>
            <br />
            <input
              id={styles.NewName}
              type='text'
              name='name'
              value={newProdValues.name}
              onChange={e => updateNewProdValues({ type: 'name', value: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor={styles.NewPrice}>Giá bán</label>
            <br />
            <input
              id={styles.NewPrice}
              min={0}
              type='number'
              step={0.5}
              name='price'
              onChange={e => updateNewProdValues({ type: 'price', value: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor={styles.NewPrice}>Ảnh sản phẩm</label>
            <br />
            <input ref={fileRef} id={styles.NewImg} type='file' name='img' />
          </div>
          <div>
            <input type='submit' value='Thêm sản phẩm' />
          </div>
        </form>
      </div>
    );
};

const OrderList = ({ orders }) => {
  return (
    <div id={styles.OrderList}>
      <div>
        <h2>Danh sách đơn hàng</h2>
        <hr />
      </div>
      <div>
        {Array.isArray(orders) &&
          orders.map(o => (
            <>
              <div key={o.detail.order_id} className={styles.orderDetail}>
                <div>
                  {o.items.map(i => {
                    return (
                      <>
                        <div key={i.product_id}>
                          <ShowProductName id={i.product_id} />
                          <span> x {i.quantity}</span>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div>{o.detail.email}</div>
                <div>{formatPrice(parseFloat(o.detail.total) * 1000)} đ</div>
                <div>
                  <button className={styles.verify} onClick={() => removeOrder(o.detail.order_id)}>
                    Duyệt
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

const ShowProductName = ({ id }) => {
  const [name, setName] = useState(undefined);
  useEffect(() => {
    if (!name) getProduct(id).then(res => setName(res.prod.name));
  }, [id, name]);

  return <span>{name}</span>;
};

const Page = () => {
  const [products, setProducts] = useState(undefined);
  const [orders, setOrders] = useState(undefined);

  const [panel, setPanel] = useState(undefined);

  useEffect(() => {
    if (!products)
      getAllProductsAsync().then(res => {
        setProducts(res.product_list);
      });
    else {
      setPanel(<ProductList products={products} />);
    }
  }, [products]);

  useEffect(() => {
    if (!orders) getAllOrders().then(res => setOrders(res.orders));
  }, [orders]);

  return (
    <>
      <div id={styles.SideBar}>
        <div>
          <div>
            <button onClick={() => setPanel(<ProductList products={products} />)}>Sản phẩm</button>
          </div>
          <div>
            <button onClick={() => setPanel(<OrderList orders={orders} />)}>Đơn hàng</button>
          </div>
        </div>
      </div>
      <div id={styles.InfoPanel}>{panel}</div>
    </>
  );
};

export { Page as AdminPage };
