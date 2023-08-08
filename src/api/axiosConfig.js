import axios from "axios";
import { endpoint } from "../utils/common";

export const axiosConfig = axios.create({
  baseURL: endpoint,
  method: "get",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("persist:auth")
    ).token.replace(/"/g, "")}`,
  },
});
