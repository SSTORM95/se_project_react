const TOKEN_KEY = "jwt";

export const getToken = () => localStorage.getItem(TOKEN_KEY);