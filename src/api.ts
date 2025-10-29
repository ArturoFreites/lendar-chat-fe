import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/backoffice/api", // ajustá según tu backend
});
