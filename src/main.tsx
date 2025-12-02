import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import 'polyfill-crypto-methods';
import { UserProvider } from "./contexts/UserContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>    
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

