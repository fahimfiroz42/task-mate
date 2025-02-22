import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
 
  RouterProvider
} from "react-router-dom";
import Route from './routes/Route.jsx';
import AuthContextProvider from './AuthPovider/AuthPovider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
        
    <RouterProvider router={Route} />
    </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
