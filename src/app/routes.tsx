import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "../pages/login/LoginPage";
import OAuth2Redirect from "../pages/oauth2/OAuth2Redirect";
import EmailRequired from "../pages/auth/EmailRequired";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <div className="p-4">FitLink Home</div>,
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

