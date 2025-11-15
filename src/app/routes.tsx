import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import OAuth2Redirect from "../pages/oauth2/OAuth2Redirect";
import EmailRequired from "../pages/auth/EmailRequired";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/oauth2/redirect",
        element: <OAuth2Redirect />,
      },
      {
        path: "/auth/email-required",
        element: <EmailRequired />,
      },
    ],
  },
]);

