import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation()
  return (
    <div className="parent my-24">
      <div className="flex items-center justify-center mb-8">
        <Link to="/dashboard" className={`border-b-2 p-3 mx-3 ${location.pathname === "/dashboard" && "border-b-primary"}`}>
          My Orders
        </Link>
        <Link to="/dashboard/add-review" className={`border-b-2 p-3 mx-3 ${location.pathname === "/dashboard/add-review" && "border-b-primary"}`}>
          Add a Review
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
