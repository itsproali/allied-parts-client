import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);


  if (loading || updating) {
    return <Loading/>;
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center mt-16">
      <div className="card w-96 bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="text-center text-3xl font-semibold">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input border border-neutral focus:outline-none focus:border-accent w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter your name",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="text-red-500 label-text-alt">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

            {/* Email */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email address"
                className="input border border-neutral focus:outline-none focus:border-accent w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please provide your email",
                  },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="text-red-500 label-text-alt">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-500 label-text-alt">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            {/* Password */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Choose a strong password"
                className="input border border-neutral focus:outline-none focus:border-accent w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Choose a strong password",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="text-red-500 label-text-alt">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 label-text-alt">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            {error && <p className="text-red-500">{error.message}</p>}
            {updateError && (
              <p className="text-red-500">{updateError.message}</p>
            )}

            <input
              className="btn w-full btn-primary text-white"
              type="submit"
              value="Create New Account"
            />
          </form>

          <p className="text-center mt-2 text-sm">
            Already have an account?
            <Link to="/login" className="text-accent">
              {" "}
              Please Login
            </Link>
          </p>

          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
