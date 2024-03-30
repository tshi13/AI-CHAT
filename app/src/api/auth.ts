import { decodeToken, setToken } from "@/lib/jwt-decoder";
import { Role, User } from "@/lib/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function register(
  username: string,
  password: string,
  role: Role
): Promise<User | void> {
  const response = await axios.post(`${API_URL}/user/register`, {
    username,
    password,
    role,
  });
  console.log(response.data);
  // const access_token = response;
  // setToken(access_token);
  // return decodeToken(access_token);
}

export async function login(
  username: string,
  password: string
): Promise<User | void> {
  const response = axios.post(`${API_URL}/users/login`, {
    username,
    password,
  });
  console.log((await response).data);
  // const access_token = response;
  // setToken(access_token);
  // return decodeToken(access_token);
}
