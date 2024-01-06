import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
    allowedRoles: String[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
    const { authUser } = useAuth();

    const location = useLocation();
    console.log("AUTH USER")
    console.log(authUser);

    return (
        allowedRoles.includes(authUser?.user?.role)
            ? <Outlet />
            : authUser?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;