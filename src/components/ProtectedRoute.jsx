import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = () => {
    const { user } = useUser();
    const userLocal = localStorage.getItem("user"); 
    console.log(user);
    return user || userLocal ? <Outlet /> : <Navigate to="/" />;
    }

export default ProtectedRoute;