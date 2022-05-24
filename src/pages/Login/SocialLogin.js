import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase-init";

const SocialLogin = () => {
  // const from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  if (gError) {
    <p className="text-red-500">{gError.message}</p>;
  }

  if (gLoading) {
    return <p>Loading ....</p>;
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
