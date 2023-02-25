import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ActiveEmailPage, LoginPage, RegisterPage } from "../../pages/authentication";
import { ProfilePageLayout, ProtectedLayout } from "../layout";
import { ProfilePage, EditProfilePage } from "../../pages/user";

function App() {
  return (
    <Routes>
      <Route path="auth" element={<Outlet />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="active" element={<ActiveEmailPage />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="group" element={<h1>Group</h1>} />
        <Route path="presentation" element={<h1>Presentation</h1>} />
        <Route path="user" element={<ProfilePageLayout />} exact>
          <Route path="" element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="edit" element={<EditProfilePage />} />
          <Route path=":userId" element={<h1>Profile</h1>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
