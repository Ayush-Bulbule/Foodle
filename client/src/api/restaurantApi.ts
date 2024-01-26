
import { IAddress } from '../types';
import api, { apiFromData } from './api';
import axios from './api';



// GET the Menus
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


//GET the Top Restaurants
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


// POST Add Meus
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


// GET restaurant Details 
export const getRestaurantDetailsById = async () => {
    try {
        const response = await axios.get(`/getRestaurantByUserId`);

        console.log("response", response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }
}

//POST: Add Restaurant
export const addRestaurant = async (data: FormData) => {
    try {
        const response = await apiFromData.post(`/addRestaurant`, data);
        console.log("response", response)
        return response.data;
    } catch (err) {
        console.log(err)
        throw new Error('Error adding menu data');
    }
}

//PUT: Update Restaurant Details
export const updateRestaurant = async (id: string, data: FormData) => {
    try {
        const response = await apiFromData.put(`/updateRestaurant/${id}`, data);
        console.log("response", response)
        return response.data;
    } catch (err) {
        console.log(err)
        throw new Error('Error adding menu data');
    }
}


//PUT: Update Restaurant Address
export const updateRestaurantAddress = async (address: IAddress) => {
    try {
        const response = await api.put(`/updateAddress`, address);
        console.log("response", response)
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('Error updating address');
    }
}


//GET: Get Restaurant Details
export const getRestaurantDetails = async (id: string) => {
    try {
        const response = await api.get(`/getRestaurantDetails/${id}`);
        console.log("response", response)
        return response.data;
    } catch (err) {
        console.log(err)
        throw new Error('Error fetching restaurant data');
    }
}