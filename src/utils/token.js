const TOKEN_KEY = "jwt";

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);