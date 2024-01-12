import axios from "../api/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth()!;

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        console.log("Refreash Request: ")
        console.log(response);

        setAuth(response.data)
        return response.data.accessToken;
    }
    return refresh;
}


export default useRefreshToken;