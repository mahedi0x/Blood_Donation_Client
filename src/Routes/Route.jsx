import { createBrowserRouter } from "react-router";

import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import ProfilePage from "../Pages/Dashboard/ProfilePage";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageDonationRequest from "../Pages/Dashboard/ManageDonationRequest";
import DonationRequestDetails from "../Pages/Dashboard/DonationRequestDetails";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllDonationRequest from "../Pages/Dashboard/Admin/AllDonationRequest";
import About from "../Components/About";
import DonorSearch from "../Pages/DonorSearch";
import DonationRequests from "../Pages/DonationRequests";
import PrivateRoute from "../Context/PrivateRoute";
import Funding from "../Pages/Funding";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Payment/PaymentCancelled";
import PaymentLayout from "../Layouts/PaymentLayout";
import RootLayout from "../Layouts/RootLayout";

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
      {
        path: "search",
        Component: DonorSearch,
        loader: () => fetch("/districts.json"),
      },
      {
        path: "donation-requests",
        Component: DonationRequests,
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
  {
    path: "dashboard",
    Component: DashboardLayout,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      { index: true, Component: Dashboard },
      {
        path: "my-profile",
        Component: ProfilePage,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
        loader: () => fetch("/districts.json"),
      },
      {
        path: "manage-donation-request/:id",
        Component: ManageDonationRequest,
      },
      {
        path: "donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails></DonationRequestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "all-blood-donation-request",
        Component: AllDonationRequest,
      },
    ],
  },
  {
    path: "funding",
    Component: PaymentLayout,
    children: [
      {
        index: true,
        Component: Funding,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
    ],
  },
]);
