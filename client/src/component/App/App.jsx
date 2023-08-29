import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { ActiveEmailPage, LoginPage, RegisterPage } from "../../pages/authentication";
import { ProfilePageLayout, ProtectedLayout } from "../layout";
import { ProfilePage, EditProfilePage } from "../../pages/user";
import { GroupListPage, GroupDetailsPage, CreateGroupPage, JoinGroupPage  } from "../../pages/group";
import { CreatePresentationPage, EditPresentationPage, ShowPresentationPage, PresentationsPage } from "../../pages/presentation";
import { HomePage } from "../../pages/home";
import JoinGroup from "../groups/JoinGroup";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/authSlice";

function App() {
  const dispatch = useDispatch();
  const [auth]= useLocalStorage("auth", null)
  if (auth){
    dispatch(loginSuccess(auth.data))
  }
  return (
    <Routes>
      <Route path="auth" element={<Outlet />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="active" element={<ActiveEmailPage />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomePage/>} />
        <Route path="groups" element={<Outlet />} >
          <Route path="mygroups" element={<GroupListPage />} />
          <Route path=":groupId" element={<GroupDetailsPage/>} />
          <Route path="create" element={<CreateGroupPage/>} />
          <Route path="join" element={<JoinGroupPage/>} />
          <Route path="join/:code" element={<JoinGroup/>} />
        </Route>
        <Route path="presentation" element={<Outlet/>} >
          <Route path="create" element={<CreatePresentationPage/>} />
          <Route path=":presentationId/show" element={<ShowPresentationPage/>} />
          <Route path=":presentationId/edit" element={<EditPresentationPage/>} />
          <Route path="mypresentations" element={<PresentationsPage/>} />
        </Route>

        <Route path="user" element={<ProfilePageLayout/>} exact>
          <Route path="edit" element={<EditProfilePage />} />
          <Route path=":userId" element={<ProfilePage/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
