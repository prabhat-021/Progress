import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
    try {
        const res = await axios.get(`${backendUrl}/csrf-token`, { withCredentials: true });
        const csrfToken = res.data.csrfToken;

        config.headers['csrf-token'] = csrfToken;
        return config;
    } catch (err) {
        console.error('Failed to fetch CSRF token:', err);
        return config;
    }
});

export default axiosInstance;
