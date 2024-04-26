import axios from "axios";

export const DatabaseService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_SERVER_URL
})