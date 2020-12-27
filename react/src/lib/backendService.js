import { stringify as parseQueryString } from 'query-string';

// -----------------------------------------------AUTHENTICATION-----------------------------------------------
export const checkAuthenticationAsync = async () =>
  fetch(`${process.env.REACT_APP_API_SERVER}/auth`, {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const authenticateAsync = async (newAccount, type) =>
  fetch(`${process.env.REACT_APP_API_SERVER}/auth/${type}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAccount),
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const unauthenticateAsync = async () =>
  fetch(`${process.env.REACT_APP_API_SERVER}/auth/signout`, { credentials: 'include' })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const updateAccountAsync = async account =>
  fetch(`${process.env.REACT_APP_API_SERVER}/auth/update`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account),
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

// -----------------------------------------------PRODUCTS-----------------------------------------------
export const getAllProductsAsync = async () =>
  fetch(`${process.env.REACT_APP_API_SERVER}/prod`, { credentials: 'include' })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const searchProductAsync = async queryOption =>
  fetch(`${process.env.REACT_APP_API_SERVER}/prod/s?${parseQueryString(queryOption)}`, {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const getProductImageUrl = img => `${process.env.REACT_APP_API_SERVER}/${img}.jpg`;

// -----------------------------------------------CART MANAGEMENT-----------------------------------------------
export const getCartItems = async () =>
  fetch(`${process.env.REACT_APP_API_SERVER}/cart`, {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const addCartItem = async prod =>
  fetch(`${process.env.REACT_APP_API_SERVER}/cart/add`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prod: prod }),
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const removeCartItem = async prod =>
  fetch(`${process.env.REACT_APP_API_SERVER}/cart/remove`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prod: prod }),
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const emptyCart = async () =>
  fetch(`${process.env.REACT_APP_API_SERVER}/cart/empty`, { credentials: 'include' })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const setCartItemQuantity = async (prod, quantity) =>
  fetch(`${process.env.REACT_APP_API_SERVER}/cart/quantity`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prod: prod, quantity: quantity }),
  });

export const getAllOrders = async () =>
  fetch(`${process.env.REACT_APP_API_SERVER}/order`)
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const addProduct = async (prod, img) => {
  const file = new FormData();
  file.append('img', img);
  file.append('prod', JSON.stringify(prod));

  return fetch(`${process.env.REACT_APP_API_SERVER}/prod/add`, {
    method: 'POST',
    body: file,
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));
};

export const removeProduct = async prod =>
  fetch(`${process.env.REACT_APP_API_SERVER}/prod/remove`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prod),
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const getProduct = async id =>
  fetch(`${process.env.REACT_APP_API_SERVER}/prod/get`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: id }),
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const removeOrder = async id =>
  fetch(`${process.env.REACT_APP_API_SERVER}/order/remove`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId: id }),
  })
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));
