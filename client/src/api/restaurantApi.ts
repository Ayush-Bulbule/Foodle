import axios from 'axios';
import api from './api';

const REACT_APP_API_URL = (import.meta.env.VITE_FOODLE_API_URL || 'http://localhost:4000/api' as string)


export const getMenu = async () => {
    try {
        const response = await api.get(`${REACT_APP_API_URL}/getAllMenu`);
        console.log("response", response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }

}

export const getTopRestaurants = async () => {
    try {
        const response = await api.get(`${REACT_APP_API_URL}/getTopRestaurants`);
        console.log("response", response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }

}