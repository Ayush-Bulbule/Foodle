import { original } from '@reduxjs/toolkit';
import axios from 'axios'

export const APP_API_URL = 'https://foodle-api.onrender.com/'
// export const APP_API_URL = 'http://localhost:4000/'

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'include',
    },
});

//Use of intraceptors 
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        console.log("API RESPONSEEEEEEEEEEEEEEEE")
        console.log(error.config)
        const originalRequest = error.config;

        if (error.response.status === 401 && originalRequest) {
            console.log("error 401  dd ")
            console.log(originalRequest)
            try {
                await axios.get(APP_API_URL + '/refresh', { withCredentials: true })
                return api.request(originalRequest);
            } catch (err) {
                console.log(err)
            }
        }

        if (error.response.status) {
            console.log("error 401")
        }
        throw error;
    }
)


export default api;