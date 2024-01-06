import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    authUser: any;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
    authUser: {},
    setAuthUser: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [authUser, setAuthUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }
    useEffect(() => {
        // console.log("AUTH USER")
        // console.log(authUser);
        const authUser = localStorage.getItem('authUser');
        if (authUser) {
            setAuthUser(JSON.parse(authUser));
            setIsLoggedIn(true);
        }
    }, [authUser])


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
