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
import { SocketContext, getSocket } from "./context/socket-context";
import { GOOGLE_CLIENT_ID } from "./config";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GoogleOAuthProvider
              clientId={GOOGLE_CLIENT_ID}
            >
              <SnackbarProvider maxSnack={3}>
                <SocketContext.Provider value={getSocket()}>
                  <App />
                </SocketContext.Provider>
              </SnackbarProvider>
            </GoogleOAuthProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
