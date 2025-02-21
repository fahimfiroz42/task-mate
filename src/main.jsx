import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
 
  RouterProvider
} from "react-router-dom";
import Route from './routes/Route.jsx';
import AuthContextProvider from './AuthPovider/AuthPovider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
        
    <RouterProvider router={Route} />
    </AuthContextProvider>
  </StrictMode>,
)
