import "./App.css";
import {
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { LoginPage, RegisterPage } from "../../pages/authentication";
import { ProtectedLayout } from "../layout";

function App() {
  return (
      <Routes>
        <Route path="auth" element={<Outlet/>} >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage/>} />
        </Route>
        <Route element={<ProtectedLayout />}>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="group" element={<h1>Group</h1>} />
              <Route path="presentation" element={<h1>Presentation</h1>} />
              <Route path="user" element={<h1>User</h1>} />
        </Route>
      </Routes>
  );
}

export default App;
