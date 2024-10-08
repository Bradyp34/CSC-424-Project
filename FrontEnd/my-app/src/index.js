import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './Pages/LoginPage';
import InventoryPage from './Pages/InventoryPage';
import AccountPage from './Pages/AccountPage';
import LoginSuccess from './Pages/LoginSuccess';
import AccountCreation from './Pages/AccountCreation';
import EditPage from './Pages/EditPage';
import { UserProvider } from './context/UserType';


import {
  createBrowserRouter,
    RouterProvider,
    // eslint-disable-next-line
  Route,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "Login",
    element: <LoginPage/>,
  },
  {
    path: "Inventory",
    element: <InventoryPage/>,
  },
  {
    path: "Account",
    element: <AccountPage/>,
  },
  {
    path:"LoginSuccess",
    element: <LoginSuccess/>
  },
  {
    path:"AccountCreation",
      element: <AccountCreation />
  },
  {
      path: "EditPage",
      element: <EditPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <UserProvider>
    <RouterProvider router={router}/>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

