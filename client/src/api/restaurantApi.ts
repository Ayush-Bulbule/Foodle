
import api, { apiFromData } from './api';
import axios from './api';



export const getMenu = async () => {
    try {
        const response = await axios.get(`/getAllMenu`);
        // console.log("response", response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }

}

export const getTopRestaurants = async () => {
    try {
        const response = await axios.get(`/getTopRestaurants`);
        // console.log("response", response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }
}

export const addMenu = async (data: FormData) => {
    try {
        const response = await apiFromData.post(`/addMenu`, data);
        console.log("response", response)
        return response.data;
    } catch (err) {
        console.log(err)
        throw new Error('Error adding menu data');
    }
}