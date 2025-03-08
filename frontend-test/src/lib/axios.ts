import axios from "axios";

export const BASE_URL = process.env.NEXT_HOSTNAME;

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
