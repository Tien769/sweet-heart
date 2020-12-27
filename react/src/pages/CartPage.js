import { useCallback, useEffect, useState } from 'react';
import { useWarning } from '../components/Warning';
import styles from './CartPage.module.scss';
import {
  checkAuthenticationAsync,
  emptyCart,
  getCartItems,
  getProductImageUrl,
  removeCartItem,
  setCartItemQuantity,
} from '../lib/backendService';
import { formatPrice } from '../components/ProductCard';

const getPurchaseTotal = itemList => {
  if (Array.isArray(itemList)) {
    return itemList.reduce((total, item) => {
      return item.price * item.quantity + total;
    }, 0);
  }
};

const PurchaseListRenderer = ({ cartItems, purchaseList, updatePurchaseList }) => {
  return (
    <>
      <h2>Danh sách sản phẩm thanh toán</h2>
      <hr />
      <div id={styles.PurchaseList}>
        <div>
          <div></div>
          <div>Tên sản phẩm</div>
          <div>Giá</div>
          <div>Số lượng</div>
          <div>Xóa</div>
        </div>

        {cartItems.map(item => (
          <div key={item.product_id}>
            <div>
              <img alt='' src={getProductImageUrl(item.img)}></img>
            </div>
            <div>{item.name}</div>
            <div>
              {formatPrice(parseFloat(item.price) * 1000)}
              <span>₫</span>
            </div>
            <div>x{item.quantity}</div>
            <div>
              <input
                type='checkbox'
                checked={
                  Array.isArray(purchaseList) &&
                  purchaseList.some(p => p.product_id === item.product_id)
                }
                onChange={() => updatePurchaseList(item)}
              />
            </div>
          </div>
        ))}
        <div>
          Tổng tiền: {formatPrice(parseFloat(getPurchaseTotal(purchaseList)) * 1000)}
          <span>đ</span>
        </div>
      </div>
    </>
  );
};

const CartItemsRenderer = ({ cartItems, cartUpdateHandler }) => {
  return (
    <>
      <h2>Giỏ hàng</h2>
      <hr />
      <div id={styles.CartItems}>
        <div>
          <div></div>
          <div>Tên sản phẩm</div>
          <div>Giá</div>
          <div>Số lượng</div>
          <div>Xóa</div>
        </div>
        {cartItems.map(item => (
          <div key={item.product_id}>
            <div>
              <img alt='' src={getProductImageUrl(item.img)} />
            </div>
            <div>{item.name}</div>
            <div>
              {formatPrice(parseFloat(item.price) * 1000)}
              <span>đ</span>
            </div>
            <div>
              <input
                type='number'
                min={1}
                max={15}
                value={item.quantity}
                onChange={e => {
                  setCartItemQuantity(item, parseInt(e.target.value)).then(_ => {
                    cartUpdateHandler();
                  });
                }}
              />
            </div>
            <div>
              <button
                onClick={_ => {
                  _.preventDefault();
                  removeCartItem(item).then(_ => cartUpdateHandler());
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ReceiptRenderer = ({ purchaseList, currentUser, paymentMethod, setPaymentMethod }) => {
  if (!currentUser) return null;
  else
    return (
      <>
        <h2>Chi tiết hóa đơn</h2>
        <hr />
        <div id={styles.Receipt}>
          {/* User info and payment option */}
          <div id={styles.UserInfo}>
            <div>
              <h3>1. Thông tin người mua</h3>
            </div>
            <div>Thông tin thanh toán</div>
            <div>
              <input type='text' readOnly value={currentUser.name} />
            </div>
            <div>
              <input type='text' readOnly value={currentUser.phone} />
            </div>
            <div>
              <input type='text' readOnly value={currentUser.email} />
            </div>
            <div>
              <input type='text' readOnly value={currentUser.address} />
            </div>
            <div>
              <div id={styles.PaymentMethod} onChange={e => setPaymentMethod(m => !m)}>
                <input
                  type='radio'
                  name='method'
                  value='fast'
                  checked={paymentMethod === false}
                  readOnly
                />
                <label>Giao hàng nhanh</label>
                <input
                  type='radio'
                  name='method'
                  value='eco'
                  checked={paymentMethod === true}
                  readOnly
                />
                <label>Giao hàng tiết kiệm</label>
              </div>
            </div>
          </div>
          {/* Order infos */}
          <div id={styles.OrderInfo}>
            <div>
              <h3>2. Thông tin đơn hàng</h3>
            </div>
            <div>
              {Array.isArray(purchaseList) &&
                purchaseList.map(i => (
                  <div key={i.product_id}>
                    <div>
                      <img alt='' src={getProductImageUrl(i.img)} />
                    </div>
                    <div>
                      {i.name} x {i.quantity}
                    </div>
                    <div>
                      {formatPrice(parseFloat(i.price) * 1000 * i.quantity)}
                      <span className={styles.currency}>đ</span>
                    </div>
                  </div>
                ))}
            </div>
            <hr />
            <div>
              <div>
                <div>Thành tiền</div>
                <div>
                  {formatPrice(getPurchaseTotal(purchaseList) * 1000)}
                  <span className={styles.currency}>đ</span>
                </div>
              </div>
              <div>
                <div>Phí vận chuyển</div>
                <div>
                  {formatPrice(paymentMethod ? 30000 : 12000)}
                  <span className={styles.currency}>đ</span>
                </div>
              </div>
              <div>
                <div>Phí vận chuyển</div>
                <div>
                  {formatPrice(
                    getPurchaseTotal(purchaseList) * 1000 + (paymentMethod ? 30000 : 12000)
                  )}
                  <span className={styles.currency}>đ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

const PaymentDone = () => {
  return <div id={styles.Done}>BẠN ĐÃ HOÀN THÀNH THANH TOÁN.</div>;
};

const Page = () => {
  const [cartItems, setCartItems] = useState(undefined);
  const [paymentPage, setPaymentPage] = useState('Cart');
  const [purchaseList, setPurchaseList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [warning, triggerWarning, setWarningText] = useWarning();

  const startPaymentProcess = () => {
    if (!currentUser)
      checkAuthenticationAsync().then(res => {
        if (res.authenticated) setCurrentUser(res.user);
        else {
          setWarningText('Mời bạn đăng nhập trước khi thanh toán');
          setTimeout(() => {
            triggerWarning();
          }, 200);
          setPaymentPage('Cart');
          return;
        }
      });

    if (!cartItems.length) {
      setWarningText('Giỏ hàng trống!');
      setTimeout(() => {
        triggerWarning();
      }, 200);
      setPaymentPage('Cart');
      return;
    }

    setPaymentPage('Purchase');
  };

  // Callback to update current list of cart items
  const handleCartUpdate = useCallback(() => {
    getCartItems().then(res => {
      setCartItems(res.cart);
    });
  }, []);

  // Callback to update
  const updatePurchaseList = useCallback(
    eventItem => {
      if (!purchaseList.some(item => item.product_id === eventItem.product_id))
        setPurchaseList(l => l.concat(eventItem));
      else setPurchaseList(l => Array(...l.filter(i => i.product_id !== eventItem.product_id)));
    },
    [purchaseList]
  );

  // Initialize items in cart and purchase list
  useEffect(() => {
    if (!cartItems)
      getCartItems().then(res => {
        setCartItems(res.cart);
        setPurchaseList(res.cart);
      });
  }, [cartItems]);

  // checkout handler
  const checkOut = () => {
    const order = {
      user: currentUser,
      items: purchaseList,
      total: getPurchaseTotal(purchaseList),
    };

    emptyCart();

    fetch(`${process.env.REACT_APP_API_SERVER}/order/store`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    setPaymentPage('Done');
    setTimeout(() => {
      window.location.reload(true);
    }, 3000);
  };

  return (
    <>
      {warning}
      {cartItems ? (
        <>
          {paymentPage === 'Cart' ? (
            <CartItemsRenderer cartItems={cartItems} cartUpdateHandler={handleCartUpdate} />
          ) : paymentPage === 'Purchase' ? (
            <PurchaseListRenderer
              cartItems={cartItems}
              purchaseList={purchaseList}
              updatePurchaseList={eventItem => updatePurchaseList(eventItem)}
            />
          ) : paymentPage === 'Receipt' ? (
            <ReceiptRenderer
              purchaseList={purchaseList}
              currentUser={currentUser}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          ) : paymentPage === 'Done' ? (
            <PaymentDone />
          ) : null}

          <div id={styles.CartOptions}>
            {paymentPage === 'Cart' ? (
              <div className={styles.next}>
                <button onClick={startPaymentProcess}>Thanh toán</button>
              </div>
            ) : null}

            {paymentPage === 'Purchase' && (
              <>
                <div className={styles.prev}>
                  <button onClick={() => setPaymentPage('Cart')}>Trở về giỏ hàng</button>
                </div>
                <div className={styles.next}>
                  <button onClick={() => setPaymentPage('Receipt')}>Xuất hóa đơn</button>
                </div>
              </>
            )}

            {paymentPage === 'Receipt' && (
              <>
                <div className={styles.prev}>
                  <button onClick={() => setPaymentPage('Cart')}>Trở về giỏ hàng</button>
                </div>

                <div className={styles.next}>
                  <button onClick={checkOut}>Xác nhận thanh toán</button>
                </div>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

export { Page as CartPage };
