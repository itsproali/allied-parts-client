import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../shared/Loading";

const Dashboard = () => {
  const location = useLocation();
  const [admin, adminLoading] = useAdmin();
  useEffect(() => {
    console.log(admin);
  }, [admin]);

  if (adminLoading) {
    return <Loading />;
  }

  return (
    <div className="parent my-24">
      <div className="flex items-center justify-center mb-8">
        {!admin && (
          <>
            <Link
              to="/dashboard"
              className={`border-b-2 p-3 mx-3 ${
                location.pathname === "/dashboard" && "border-b-primary"
              }`}
            >
              My Orders
            </Link>
            <Link
              to="/dashboard/add-review"
              className={`border-b-2 p-3 mx-3 ${
                location.pathname === "/dashboard/add-review" &&
                "border-b-primary"
              }`}
            >
              Add a Review
            </Link>
          </>
        )}

        {/* For Admin */}
        {admin && (<>
          <Link
            to="/dashboard"
            className={`border-b-2 p-3 mx-3 ${
              location.pathname === "/dashboard" && "border-b-primary"
            }`}
          >
            Orders
          </Link>

          <Link
            to="/dashboard/manage-users"
            className={`border-b-2 p-3 mx-3 ${
              location.pathname === "/dashboard/manage-users" && "border-b-primary"
            }`}
          >
            Users
          </Link>

          <Link
            to="/dashboard/manage-products"
            className={`border-b-2 p-3 mx-3 ${
              location.pathname === "/dashboard/manage-products" && "border-b-primary"
            }`}
          >
            Manage Products
          </Link>
        </>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
