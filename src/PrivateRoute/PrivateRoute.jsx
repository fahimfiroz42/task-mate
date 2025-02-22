import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";


import  { AuthContext } from "../AuthPovider/AuthPovider";
import Loading from "../components/Loader";

const PrivateRoute = ({children}) => {
    const location=useLocation()

    const {user,loading}=useContext(AuthContext)


    if(loading){
        return <Loading/>

    }
    if(user){
        return children
    }

    


    return (
        <div>
            <Navigate state={location.pathname} to={'/'}></Navigate>

            
        </div>
    );
};
export default PrivateRoute;