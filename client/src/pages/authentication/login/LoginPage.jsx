import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useAuth } from "../../../context/auth-context";

import "./LoginPage.css";

function LoginPage() {
  const Auth = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (data) => {
    try {
      const result = await login(data);
      if (result.status === 200) {
        Auth.login(result.data.token, result.data.user);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        const message = `Login failed. ${data.message}`;
        enqueueSnackbar(message, { variant: "error" });
      }
    }
  };
  return (
    <div className="login_page">
      <form onSubmit={handleSubmit(onSubmit)} className="login_form">
        <h1>Login</h1>
        <div>
          <p>
            Don't have an account? <Link to={"/auth/register"}>Register</Link>
          </p>
        </div>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              error={Boolean(errors?.email)}
              helperText={errors?.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="normal"
              fullWidth
              error={Boolean(errors?.password)}
              helperText={errors?.password?.message}
            />
          )}
        />
        <div className="extend-box">
        <Controller
          name="remember"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="Remember me"
            />
          )}
        />
        <Link to={"/auth/forgot-password"}>Forgot password?</Link>
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
