import { axiosPrivate } from "../api/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { error } from "console";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    const auth = useAuth();

    useEffect(() => {

        //Config when needed
        // const requestIntercept = axiosPrivate.interceptors.request.use(
        // 
        // )


        //Response Interceptors
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                console.log("API ERR RESPONSE")

                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();  //Hook which returns the refresh token

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error); //why this?? ?
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);

        }
    }, [auth, refresh]);

}



export default useAxiosPrivate;