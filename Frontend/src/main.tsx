import React from "react";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/authContext/AuthProvider";
import "./index.css";
import GlobalStateProvider from "./contexts/globalStateContext/GlobalStateContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
