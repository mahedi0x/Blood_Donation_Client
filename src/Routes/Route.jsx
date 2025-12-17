import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import About from "../Components/About";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
export const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      hydrateFallbackElement: <div>Loading...</div>,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "about",
          Component: About,
        },
      ],
    },
    {
        path: "/",
        Component: AuthLayout,
    
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
            loader: () => fetch("./districts.json"),
          },
        ],
      },
   
  ]);
  