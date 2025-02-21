
import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLAyout from "../layout/MainLAyout";
import Error from "../Pages/Error";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
const Route =createBrowserRouter([
    {
      path: "/",
      element: <MainLAyout/>,
      errorElement:<Error/>,
      children:[
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>

        }
      ]
      
    },
  ]);

export default Route;