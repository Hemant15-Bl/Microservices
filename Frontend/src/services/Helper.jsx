import React from "react";
import axios from "axios"
import { getToken } from "../auth/Index";

const BASE_URL = "http://localhost:8084/api/v1";
export const myAxios = axios.create({ baseURL: BASE_URL });

//----- private axios for access authorize methods -------
export const privateAxios = axios.create({
    baseURL: "http://localhost:8084",
    headers: {
        'Content-Type': 'application/json',
    }
});

// ------ Interceptors for auth tokens but its optional -----------
privateAxios.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));