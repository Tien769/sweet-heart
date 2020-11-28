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
  fetch(`${process.env.REACT_APP_API_SERVER}/auth/signout`)
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const getAllProductsAsync = async () =>
  fetch(`${process.env.REACT_APP_API_SERVER}/prod`)
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));

export const searchProductAsync = async queryOption =>
  fetch(`${process.env.REACT_APP_API_SERVER}/prod/s?${parseQueryString(queryOption)}`)
    .then(res => res.json())
    .then(res => (res.error ? Promise.reject(res) : res));
