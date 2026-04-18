import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// 1. Add this import
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Wrap your App with the Provider and your Client ID */}
    <GoogleOAuthProvider clientId="402857003232-gc2dkfs86shhpe1fo1f669bmb11euf8o.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
