import React from 'react';
import ReactDOM  from 'react-dom/client';
import Homepage from "/src/pages/home/homepage.jsx";
import Login from '/src/pages/login/login.jsx';
import RegisterPage from '/src/pages/login/registerPage.jsx';
import ForbiddenError from './Routes/forbiddenError.jsx';
import NotFoundError from './Routes/notFoundError.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/advanced-todo-list',
    element: <Login />,
    errorElement: <NotFoundError />, 
  },
  {
    path: '/advanced-todo-list/register',
    element: <RegisterPage />,
    errorElement: <NotFoundError />, 
  },
  {
    path: '/advanced-todo-list/home',
    element: <Homepage />,
    errorElement: <NotFoundError />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)