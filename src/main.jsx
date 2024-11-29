import React from 'react';
import ReactDOM  from 'react-dom/client';
import Homepage from "./pages/home/homepage.jsx";
import Login from './pages/login/login.jsx';
import RegisterPage from './pages/login/registerPage.jsx';
import ForbiddenError from './Routes/forbiddenError.jsx';
import NotFoundError from './Routes/notFoundError.jsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFoundError />, 
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <NotFoundError />, 
  },
  {
    path: '/home',
    element: <Homepage />,
    errorElement: <NotFoundError />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)