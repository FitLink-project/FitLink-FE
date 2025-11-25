import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import SignupPage from "../pages/signup/SignupPage";
import SignupCompletePage from "../pages/signup/SignupCompletePage";
import OAuth2Redirect from "../pages/oauth2/OAuth2Redirect";
import EmailRequired from "../pages/auth/EmailRequired";
import SocialTermsAgreementPage from "../pages/auth/SocialTermsAgreementPage";
import PrivacyAgreementPage from "../pages/auth/PrivacyAgreementPage";
import ServiceTermsPage from "../pages/auth/ServiceTermsPage";
import LocationServicePage from "../pages/auth/LocationServicePage";

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
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/signup/complete",
        element: <SignupCompletePage />,
      },
      {
        path: "/oauth2/redirect",
        element: <OAuth2Redirect />,
      },
      {
        path: "/auth/email-required",
        element: <EmailRequired />,
      },
      {
        path: "/auth/social-terms",
        element: <SocialTermsAgreementPage />,
      },
      {
        path: "/privacy-agreement",
        element: <PrivacyAgreementPage />,
      },
      {
        path: "/service-terms",
        element: <ServiceTermsPage />,
      },
      {
        path: "/location-service",
        element: <LocationServicePage />,
      },
    ],
  },
]);

