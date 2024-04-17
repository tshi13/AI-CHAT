import { getToken } from "@/lib/jwt-decoder";
import { ErrorResponse } from "@/lib/types";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/user";

export async function getProjectById(id: number) {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}
