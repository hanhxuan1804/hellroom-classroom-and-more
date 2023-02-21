import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./component/app";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
