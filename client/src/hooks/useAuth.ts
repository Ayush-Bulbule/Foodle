import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    const auth = useContext(AuthContext);

    //Reacheck
    useDebugValue(auth?.auth, auth => auth?.user ? "Logged In" : "Logged Out");

    return useContext(AuthContext);

}

export default useAuth;
