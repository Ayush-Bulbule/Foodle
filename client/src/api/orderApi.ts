import api from "./api"



export const checkout = async () => {
    try {
        const response = await api.get('/checkout');
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error to handle it in the calling function
    }
};

//payment 
export const getPayKey = async () => {
    try {
        const response = await api.get('/getPayKey');
        return response.data;
    } catch (err) {
        throw err;
    }
}


export const addPayment = async (order_id: Number) => {
    try {
        const response = await api.post('/pay', { order_id });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export const paymentSuccessCallback = (data) => api.post("/paymentverification", data);