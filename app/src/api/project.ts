import { getToken } from "@/lib/jwt-decoder";
import { ErrorResponse, Project, ProjectQuery } from "@/lib/types";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/project";

export async function createProject(project: Project) {
  try {
    const response = await axios.post(API_URL, project, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}

export async function getProject(
  query: ProjectQuery = {
    offset: 0,
    limit: 25,
    order: "ASC",
  }
) {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: query,
    });
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}

export async function updateProject(project: Project) {
  try {
    const response = await axios.put(`${API_URL}/${project.id}`, project, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}

export async function deleteProject(id: string) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}

export async function joinProject(userId: number, projectId: string) {
  try {
    const response = await axios.post(
      `${API_URL}/join`,
      { userId, projectId },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data;
  } catch (err) {
    const error = (err as AxiosError).response?.data as ErrorResponse;
    throw new Error(`Error ${error.statusCode} - ${error.message}`);
  }
}

