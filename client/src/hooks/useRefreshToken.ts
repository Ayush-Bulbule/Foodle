import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const setAuth = useAuth()?.setUser;

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })

        setAuth(prev => {
            console.log("Response Data: ")
            console.log(JSON.stringify(prev));
            console.log(response.data.prev)
            return {
                ...prev,
                user: response.data.user
            }
        })
        return response.data.accessToken;
    }
    return refresh;
}


export default useRefreshToken;