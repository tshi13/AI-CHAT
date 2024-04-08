import { decodeToken, setToken } from "@/lib/jwt-decoder";
import { ErrorResponse, Role, User } from "@/lib/types";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/user";
export async function register(
  username: string,
  password: string,
  role: Role
): Promise<User> {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
      role,
    });
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}

export async function login(username: string, password: string): Promise<User> {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const jwtToken = response.data["access_token"];
    setToken(jwtToken);
    return decodeToken(jwtToken);
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}
