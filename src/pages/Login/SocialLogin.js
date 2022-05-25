import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase-init";
import useToken from "../../hooks/useToken";
import Loading from "../shared/Loading";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [token] = useToken(gUser);
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [navigate, token, from]);

  if (gError) {
    <p className="text-red-500">{gError.message}</p>;
  }

  if (gLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <button
        className="btn btn-outline btn-primary w-full"
        onClick={() => signInWithGoogle()}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
