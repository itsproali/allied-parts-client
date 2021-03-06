import { signOut } from "firebase/auth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase-init";
import Loading from "./Loading";
import useAdmin from "../../hooks/useAdmin";

const RequireAdmin = ({ children }) => {
  const [admin, adminLoading] = useAdmin();
  const location = useLocation();

  if (adminLoading) {
    return <Loading />;
  }

  if (!admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default RequireAdmin;
