import React from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import auth from "../../firebase-init";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const handleResetPassword = () => {
    const resetEmail = getValues("email");
    if (resetEmail !== "" && !resetError) {
      sendPasswordResetEmail(resetEmail);
    } else {
      window.alert("Something Went wrong");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center mt-10">
      <div className="card w-96 bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="text-center text-3xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Password"
                className="input border border-neutral focus:outline-none focus:border-accent w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="text-red-500 label-text-alt">
                    {errors.password.message}
                  </span>
                )}
                <span
                  className="text-accent cursor-pointer text-xs hover:underline mb-2"
                  onClick={handleResetPassword}
                >
                  Forgot Password?
                </span>
              </label>
            </div>

            {/* <label htmlFor="forgetPassword" className="label">
            </label> */}

            {error && <p className="text-red-500">{error.message}</p>}
            {resetError && <p className="text-red-500">{resetError.message}</p>}

            <input
              className="btn w-full btn-primary text-white"
              type="submit"
              value="Login"
            />
          </form>

          <p className="text-center mt-2 text-sm">
            Don't have an account?
            <Link to="/register" className="text-accent">
              {" "}
              Create New Account
            </Link>
          </p>

          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
