import axios from 'axios';

const API_BASE_URL = "https://localhost:7104/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

export default axiosInstance;