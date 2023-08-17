import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./component/app";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <SnackbarProvider maxSnack={3}>
                <App />
              </SnackbarProvider>
            </GoogleOAuthProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
