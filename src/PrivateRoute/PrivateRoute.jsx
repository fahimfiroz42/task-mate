import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loader from "../Components/Loader";
import  { AuthContext } from "../AuthPovider/AuthPovider";

const PrivateRoute = ({children}) => {
    const location=useLocation()

    const {user,loading}=useContext(AuthContext)


    if(loading){
        return <Loader/>

    }
    if(user){
        return children
    }

    


    return (
        <div>
            <Navigate state={location.pathname} to={'/login'}></Navigate>

            
        </div>
    );
};
export default PrivateRoute;