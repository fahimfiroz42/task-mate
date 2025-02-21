
import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLAyout from "../layout/MainLAyout";
import Error from "../Pages/Error";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddTaskForm from "../Pages/AddTaskForm";
import Home from "../Pages/Home";
const Route =createBrowserRouter([
    {
      path: "/",
      element: <MainLAyout/>,
      errorElement:<Error/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>

        },
        {
          path:'/add-task',
          element:<AddTaskForm/>
        }
      ]
      
    },
  ]);

export default Route;