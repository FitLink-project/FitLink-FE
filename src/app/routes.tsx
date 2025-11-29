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

import FacilityMapPage from "../pages/facility/FacilityMapPage";
import FacilitySearchPage from "../pages/facility/FacilitySearchPage";
import FacilitySearchResultPage from "../pages/facility/FacilitySearchResultPage";
import StationResultMapPage from "../pages/facility/StationResultMapPage";
import FacilityDetailPage from "../pages/facility/FacilityDetailPage";
import FacilityProgramsPage from "../pages/facility/FacilityProgramsPage";

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


      // A. 주변시설 지도 페이지
      {
        path: "/facility",
        element: <FacilityMapPage />,
      },

      // B. 검색화면
      {
        path: "/facility/search",
        element: <FacilitySearchPage />,
      },

      // C. 검색결과 화면 (keyword는 query string으로 받음)
      {
        path: "/facility/search/result",
        element: <FacilitySearchResultPage />,
      },

      // D. 지하철역 검색 → 지도 이동 페이지
      {
        path: "/facility/station/:stationId",
        element: <StationResultMapPage />,
      },

      // E. 공공체육시설 상세 페이지
      {
        path: "/facility/detail/:facilityId",
        element: <FacilityDetailPage />,
      },

      // F. 공공체육시설 프로그램 목록 페이지
      {
        path: "/facility/detail/:facilityId/programs",
        element: <FacilityProgramsPage />,
      },


    ],
  },
]);
