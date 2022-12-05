import React from "react";
import logoImg from "../../../assets/logo.jpg";
import {useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {ThreeDots} from 'react-loader-spinner'
import { registerUser } from "../../../api";
import "./RegisterForm.css";

export default function RegisterForm() {
    const history = useNavigate();
    const {register, handleSubmit, watch,  formState: {errors}} = useForm();
    const { mutateAsync, isLoading, isError, error } = useMutation(registerUser);
    const onSubmit = async (data) => {
        await mutateAsync(data);
        history('/login');
    }
    return (
        <section>
            <div className="authform">
                <div className="col-1">
                    <h2>Register</h2>
                    <ul>Already have an account? <Link to="/login">Login</Link></ul>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" placeholder="Email" {...register("email",{required: true, pattern: /^\S+@\S+$/i})}/>
                        {errors.email && errors.email.type === "required" && <span>This field is required</span>}
                        {errors.email && errors.email.type === "pattern" && <span>Invalid email address</span>}
                        <input type="password" placeholder="Password" {...register("password",{required: true, minLength: 6})}/>
                        {errors.password && errors.password.type === "required" && <span>This field is required</span>}
                        {errors.password && errors.password.type === "minLength" && <span>Password must be at least 6 characters</span>}
                        <input type="password" placeholder="Confirm Password" {...register("confirmPassword",{required: true})}/>
                        {errors.confirmPassword && errors.confirmPassword.type === "required" && <span>This field is required</span>}
                        {!errors.confirmPassword && watch("confirmPassword") !== watch().password && <span>Passwords do not match</span>}
                        <input type="text" placeholder="Full name" {...register("fullName",{required: true, minLength: 4})}/>
                        {errors.fullName && errors.fullName.type === "required" && <span>This field is required</span>}
                        {errors.fullName && errors.fullName.type === "minLength" && <span>Full name must be at least 4 characters</span>}
                        <input type="date" placeholder="Date of Birth" {...register("dateOfBirth",{required: true})} defaultValue={"2000-01-01"}/>
                        {errors.dateOfBirth && errors.dateOfBirth.type === "required" && <span>This field is required</span>}
                        {isError && <span> {error.message}</span>}
                        <button type="submit" className="btn btn-primary">
                        {isLoading ? <ThreeDots
                          radius={9} color="#fff" height={20} width={20} /> 
                         : "Register"}
                        </button>
                    </form>
                </div>
                <div className="col-2">
                    <div className="img-container">
                        <img src={logoImg} alt="bg" />
                    </div>
                </div>
            </div>
        </section>
    );
}
