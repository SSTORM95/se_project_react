import { getToken } from "./token";
import { checkResponse } from "./api";

const baseUrl = process.env.NODE_ENV === "production" 
? "https://api.wtwrsida.twilightparadox.com"
: "http://localhost:3001";



export function registerUser({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export function signInUser({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function isValidToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      return data;
    })
    .then(checkResponse);
}

export function updateUser({ name, avatar }) {
  const token = getToken();
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}
