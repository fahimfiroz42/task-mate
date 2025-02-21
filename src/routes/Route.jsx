
import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLAyout from "../layout/MainLAyout";
const Route =createBrowserRouter([
    {
      path: "/",
      element: <MainLAyout/>,
    },
  ]);

export default Route;