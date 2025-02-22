
import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLAyout from "../layout/MainLAyout";
import Error from "../Pages/Error";

import AddTaskForm from "../Pages/AddTaskForm";
import Home from "../Pages/Home";
import ManageTask from "../Pages/ManageTask";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
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
          path:'/add-task',
          element:<PrivateRoute><AddTaskForm/></PrivateRoute>
        },
        {
          path:'/manage-task',
          element:<PrivateRoute><ManageTask/></PrivateRoute>
        }
      ]
      
    },
  ]);

export default Route;