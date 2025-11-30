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
import FitnessLandingPage from "../pages/fitness/FitnessLandingPage";
import FitnessKookminPage from "../pages/fitness/FitnessKookminPage";
import FitnessGeneralPage from "../pages/fitness/FitnessGeneralPage";
import GymPage from "../pages/gym/Gym";
import ReportPage from "../pages/report/Report";
import MyPage from "../pages/mypage/MyPage";
import FacilityMapPage from "../pages/facility/FacilityMapPage";

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
      {
        path: "/fitness-landing",
        element: <FitnessLandingPage />,
      },
      {
        path: "/fitness-kookmin",
        element: <FitnessKookminPage />,
      },
      {
        path: "/fitness-general",
        element: <FitnessGeneralPage />,
      },
      //김채원
      { path: "/gym", element: <GymPage /> },
      // 정서윤
      { path: "/report", element: <ReportPage /> },
      // 장서원
      { path: "/my", element: <MyPage/> },


       // A. 주변시설 지도 페이지
      {
        path: "/facility",
        element: <FacilityMapPage />,
      },

    ],
  },
]);