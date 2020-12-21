import { stringify as parseQueryString } from 'query-string';
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

export const removeCartItem = async prod => {
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
};

export const emptyCart = async =>
  fetch(`${process.env.REACT_APP_API_SERVER}/cart/empty`, { credentials: 'include' })
    .then(res => res.json())
    .then(res => console.log(res.cart));

export const setCartItemQuantity = async (prod, quantity) =>
  fetch(`${process.env.REACT_APP_API_SERVER}/cart/quantity`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prod: prod, quantity: quantity }),
  });
