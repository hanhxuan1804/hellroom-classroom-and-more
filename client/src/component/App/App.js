import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { loginUser } from "../../api";
import { Header } from '../common';
import { RegisterForm, LoginForm } from '../authform';
import ProfilePage from '../profilepage';

function App() {
  const history = useNavigate();
  
  const [cookies, setCookie, removeCookie] = useCookies(['jwttoken']);

  const { mutateAsync: loginUserAsync, isLoading: loginUserIsLoading, isError: loginUserIsError, error: loginUserError } = useMutation(loginUser);
  const Login = async (data) => {
    const returndata = await loginUserAsync(data);
    setCookie("jwttoken", returndata.token, { path: '/', sameSite: true , secure: true});
    history('/dashboard');
  }

  const Logout = () => {
    console.log('User logged out');
    history('/');
    removeCookie('jwttoken');
  };


  return (
    <div className="App">
      <Header user={cookies.jwttoken} logOut={Logout}/>
      <div className="App-main">
      <Routes>
        <Route path="/" element={<div>
          <h1>Home</h1>
          <p>Home page body content</p>
        </div>} />
        <Route path="/login" element={<LoginForm onSubmit={(data)=> Login(data) } isLoading={loginUserIsLoading} isError={loginUserIsError} error={loginUserError}></LoginForm>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage token={cookies.jwttoken}/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
