import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import Home from "../Pages/Home/Home";
import About from "../Components/About";
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
   
  ]);
  