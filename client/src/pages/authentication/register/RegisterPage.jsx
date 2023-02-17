import { Controller, useForm } from "react-hook-form";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="register_page">
      <form onSubmit={handleSubmit(onSubmit)} className="register_form">
        <h1>Register</h1>
        <div>
          <p>
            Already have an account? <Link to={"/auth/login"}>Login</Link>
          </p>
        </div>
        <div className="register_form_name_box">
          <div className="register_form_name_box_first_name">
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "First name is required",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(errors?.firstName)}
                  helperText={errors?.firstName?.message}
                />
              )}
            />
          </div>
          <div className="register_form_name_box_last_name">
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Last name is required",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={Boolean(errors?.lastName)}
                  helperText={errors?.lastName?.message}
                />
              )}
            />
          </div>
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
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              error={Boolean(errors?.password)}
              helperText={errors?.password?.message}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: "Confirm password is required",
            },
            minLength: {
              value: 6,
              message: "Confirm password must be at least 6 characters",
            },
            validate: (value) =>
              value === watch("password") || "The passwords do not match",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="normal"
              fullWidth
              error={Boolean(errors?.confirmPassword)}
              helperText={errors?.confirmPassword?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
