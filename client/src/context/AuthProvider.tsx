import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../types";

interface AuthContextProps {
    user: IUser | null;
    setUser: (user: IUser) => void;
}

//AuthContextProps is waht type of data we can pass througjh provider
const AuthContext = createContext<AuthContextProps | null>(null);


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        console.log("Change")
        console.log(user);
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
