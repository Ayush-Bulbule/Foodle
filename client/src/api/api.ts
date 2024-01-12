import axios from 'axios'
export const APP_API_URL = 'http://localhost:4000/api'
// export const APP_API_URL = 'https://foodle-api.onrender.com/'


export default axios.create({
    baseURL: APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'include',
    },
    withCredentials: true,
});

export const api = axios.create({
    baseURL: APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'include',
    },
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        console.log("CALLING HEREEEEE.......");
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest.isRetry = true;
            try {
                await axios.get(`${APP_API_URL}/refresh`, {
                    withCredentials: true,
                });

                return api.request(originalRequest);
            } catch (err) {
                console.log(err);
            }
        }

        if (error.response.status === 400) {
            console.log(error.response.data.message);
            // toast.error(error.response.data.message);
        }
        throw error;
    }
);
