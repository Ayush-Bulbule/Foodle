import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../types";
import { refresh } from "../api/auth";

interface AuthContextProps {
    auth: {
        user: IUser;
        accessToken: string;
    }
    setAuth: (auth: any) => void;
    persist: boolean;
    setPersist: (persist: boolean) => void;
}

//AuthContextProps is waht type of data we can pass througjh provider
const AuthContext = createContext<AuthContextProps | null>(null);


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<any>(null);
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")!) || false);
    useEffect(() => {
        console.log("Auth Provider Context Data")
        console.log(auth)

        if (auth == null) {
            refresh().then((res) => {
                console.log("Refreshed Token")
                console.log(res)
                setAuth(res)
            }).catch((err) => {
                console.log("Error Refreshing Token")
                console.log(err)
            });
        }
    }, [auth])


    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
