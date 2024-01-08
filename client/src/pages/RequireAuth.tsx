import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
    allowedRoles: String[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
    const auth = useAuth();
    const user = auth?.user;

    const location = useLocation();
    console.log("AUTH USER")
    console.log(user);


    return (
        user && allowedRoles.includes(user?.role)
            ? <Outlet />
            : user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;