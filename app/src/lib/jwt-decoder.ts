import { jwtDecode } from "jwt-decode";
import { User } from "./types";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const decodeToken = (token: string): User => {
  return jwtDecode<User>(token);
};

export const deleteToken = (): void => {
  localStorage.removeItem("token");
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000;
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    return true;
  }
};
