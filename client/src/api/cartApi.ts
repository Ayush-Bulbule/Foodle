import api from "./api";



// GET: /getCart
export const getCart = async () => {
    try {
        const response = await api.get(`/getCart`);
        console.log("response", response);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('Error getting cart data');
    }
}

//GET: /getCartData
export const getCartData = async () => {
    try {
        const response = await api.get(`/getCartData`);
        console.log("response", response);
        return response.data;
    } catch (err) {
        console.log(err);
        throw new Error('Error getting cart data');
    }
}

// POST: /addToCart
export const addToCart = async (item: string, quantity: number) => {
    try {
        const response = await api.post(`/addToCart`, { item, quantity });
        console.log("response", response);
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw new Error('Error adding menu data');
    }
}


//DELETE: /deleteCart
export const deleteCartItem = async (id: string) => {
    try {
        const response = await api.delete(`/deleteCart/${id}`);
        console.log("response", response);
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw new Error('Error deleting cart data');
    }
}
