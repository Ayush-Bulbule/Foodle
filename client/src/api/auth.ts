import axios from './api';


//Refresh
export const refresh = async () => {
    try {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        return response.data;
    }
    catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }
}



//Login User
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`/login`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Error fetching user data');
    }
}

//Signup User
export const signupUser = async (name: string, email: string, phone: string, address: string, password: string) => {
    try {
        const response = await axios.post(`/register`, { name, email, phone, address, password });
        console.log("response", response)
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error adding user data');
    }
}