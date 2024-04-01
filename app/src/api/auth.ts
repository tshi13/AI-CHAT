import { decodeToken, setToken } from "@/lib/jwt-decoder";
import { Role, User } from "@/lib/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function register(
  username: string,
  password: string,
  role: Role
): Promise<User> {
  const response = await axios.post(`${API_URL}/user/register`, {
    username,
    password,
    role,
  });
  if (response.status == 201) {
    return response.data;
  } else {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
}

export async function login(
  username: string,
  password: string
): Promise<User> {
  const response = await axios.post(`${API_URL}/user/login`, {
    username,
    password,
  });
  if (response.status == 201) {
    const jwtToken = response.data["access_token"]
    setToken(jwtToken)
    return decodeToken(jwtToken);
  } else {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
}
