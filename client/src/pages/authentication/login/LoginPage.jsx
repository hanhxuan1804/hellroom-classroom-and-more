import { Controller, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { Link, useNavigate , Navigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api";
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
    setError,
    watch,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useMutation(login, {
   onSuccess: (data) => {
     const result = data.data;
     result.user.role === "admin" ? Auth.login(result.token, result.user) && navigate("/admin") :
      result.user.active ? Auth.login(result.token, result.user) && navigate("/") : navigate("/auth/active");
   },
    onError: (error) => {
      if (error.response) {
        const { data } = error.response;
        setError("all", {
          type: "manual",
          rule: "wrong",
          message: data.message,
        });
      } else {
        const message = `Login failed. ${error.message}`;
        enqueueSnackbar(message, { variant: "error" });
      }
    },
  });
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  useEffect(() => {
    clearErrors("all");
  }, [watchEmail, watchPassword, clearErrors]);

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };
  if (Auth.isAuthenticated()) {
    return <Navigate to="/" />;
  }
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
              helperText={
                errors?.password?.message || (
                  <span style={{ color: "red" }}>{errors?.all?.message}</span>
                )
              }
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
          {mutation.isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            "Login"
          )}
        </Button>
        {/* <Backdrop
          sx={{ color: "#fff00", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={mutation.isLoading}
        /> */}
      </form>
    </div>
  );
}

export default LoginPage;
