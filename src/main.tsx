import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./hooks/contextProviders/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App.tsx";

// thois is the file telling react where it should start rendering the app

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </StrictMode>
);
