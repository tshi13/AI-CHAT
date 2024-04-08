import { ErrorResponse, Project } from "@/lib/types";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/project";

export async function createProject(project: Project) {
  try {
    const response = await axios.post(API_URL, project);
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}
