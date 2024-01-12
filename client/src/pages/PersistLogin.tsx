import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";


const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);

    const refresh = useRefreshToken();

    const auth = useAuth()?.auth;
    const persist = useAuth()?.persist;


    useEffect(() => {
        console.log("Auth: ", auth)
        console.log("Persistant: ", persist)

        let isMounted = true;
        const verifyRefreshToken = async () => {
            console.log("VErify")
            try {
                const d = await refresh();
                console.log("Mounte")
                console.log(d);

            }
            catch (err) {
                console.log(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        //!a
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        }
    }, [])


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])


    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin