import axios from "../api/api"

import useAuth from "./useAuth"

const useLogout = () => {
    const setAuth = useAuth()?.setAuth;

    const logout = async () => {
        setAuth({});

        try {
            const response = await axios.post("/logout", {}, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    return logout;
}

export default useLogout;