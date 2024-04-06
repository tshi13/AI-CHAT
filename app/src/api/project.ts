import { Project } from "@/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/project";

export async function createProject(project: Project) {
  const response = await axios.post(API_URL, project);
  if (response.status == 201) {
    return response.data;
  } else {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
}
