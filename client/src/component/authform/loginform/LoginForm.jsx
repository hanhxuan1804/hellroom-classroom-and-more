import React from "react";
import logoImg from "../../../assets/logo.jpg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import "./LoginForm.css";

export default function LoginForm(props){
    const { onSubmit, isLoading, isError, error } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <section>
            <div className="authform">
                <div className="col-1">
                    <h2>Login</h2>
                    <ul>Don't have an account? <Link to="/register">Register</Link></ul>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" placeholder="Email" {...register("email",{required: true, pattern: /^\S+@\S+$/i})}/>
                        {errors.email && errors.email.type === "required" && <span>This field is required</span>}
                        {errors.email && errors.email.type === "pattern" && <span>Invalid email address</span>}
                        <input type="password" placeholder="Password" {...register("password",{required: true, minLength: 6})}/>
                        {errors.password && errors.password.type === "required" && <span>This field is required</span>}
                        {errors.password && errors.password.type === "minLength" && <span>Password must be at least 6 characters</span>}
                        {isError && <span> {error.message}</span>}
                        <button type="submit" className="btn btn-primary">
                        {isLoading ? <ThreeDots
                          radius={9} color="#fff" height={20} width={20} /> 
                         : "Login"}
                        </button>
                    </form>
                </div>
                <div className="col-2">
                    <img src={logoImg} alt="bg" />
                </div>
            </div>
        </section>
    )
}