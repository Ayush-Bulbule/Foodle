import { createContext, useContext, useState } from "react";


interface AuthContextType {
    authUser: any;
    setAuthUser: React.Dispatch<React.SetStateAction<any>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { }
});

export function useAuth() {
    return useContext(AuthContext);
}


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
