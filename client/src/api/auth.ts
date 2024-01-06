import axios from 'axios';

const REACT_APP_API_URL = (import.meta.env.VITE_FOODLE_API_URL || 'http://localhost:4000/api' as string)



//Login User
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }

}

//Signup User
export const signupUser = async (name: string, email: string, phone: string, address: string, password: string) => {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/signup`, { name, email, phone, address, password });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding user data');
    }
}