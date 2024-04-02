import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './Pages/LoginPage';
import ItemSearchPage from './Pages/ItemSearchPage';
import InventoryPage from './Pages/InventoryPage';
import AccountPage from './Pages/AccountPage';

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
    path: "ItemSearch",
    element: <ItemSearchPage/>,
  },
  {
    path: "Inventory",
    element: <InventoryPage/>,
  },
  {
    path: "Account",
    element: <AccountPage/>,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

