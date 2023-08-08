import { createBrowserRouter, redirect } from "react-router-dom";
import Notfound from "../pages/404";
import Layout from "../components/Layout/Layout";
import React from "react";
import { Login } from "../pages/Login/login";
import Dashboard from "../pages/Dashboard/Dashboard";
import RequiredAuth from "../hocs/RequiredAuth";
import LayoutDashboard from "../components/Layout/LayoutDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        index: true,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutDashboard />,
    children: [
      {
        path: "/dashboard",
        element: (
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>
        ),
      },
    ],
  },
  { path: "*", element: <Notfound /> },
]);

export default router;
