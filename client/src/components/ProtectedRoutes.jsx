import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store => store.auth);

   if (!isAuthenticated && !localStorage.getItem('token')) {
    return <Navigate to="/login" />
}
    return children;
}


export const AuthenticatedUser =({children} ) => {
    const {isAuthenticated} = useSelector(store => store.auth);

    if(isAuthenticated){
        return <Navigate to="/" />
    }
    return children;
}


export const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth);

    const token = localStorage.getItem("token");

    // agar login nahi h aur token bhi nahi h
    if (!isAuthenticated && !token) {
        return <Navigate to="/login" />;
    }

    // role check
    if (user && user?.role !== "instructor") {
        return <Navigate to="/" />;
    }

    return children;
};