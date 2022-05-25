import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useLocation } from "react-router-dom";
import auth from "../../firebase-init"
import "./Shared.css";
import "./Navbar.css";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setShow(true);
        } else {
          setShow(false);
        }
        setLastScrollY(window.scrollY);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const logOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const navItem = (
    <>
      <li>
        <NavLink className={`btn-md font-medium`} to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className={`btn-md font-medium`} to="/parts">
          Parts
        </NavLink>
      </li>
      <li>
        <NavLink className={`btn-md font-medium`} to="/reviews">
          Reviews
        </NavLink>
      </li>
      <li>
        <NavLink className={`btn-md font-medium`} to="/contact">
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink className={`btn-md font-medium`} to="/portfolio">
          My Portfolio
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      // data-aos="fade-down"
      // data-aos-duration="500"
      className={`parent visible ${show && "hidden"} ${
        window.scrollY > 200 ? "bg-white shadow-lg border-b" : "text-gray-300"
      } ${location.pathname !== "/" && "bg-white shadow-lg text-black"}`}
    >
      <div className={`navbar`}>
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex="0"
              className="btn btn-ghost lg:hidden text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItem}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl text-primary"
          >
            Allied Parts
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{navItem}</ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <NavLink className="btn btn-secondary" to="/login">
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex="0"
                className={`btn btn-circle avatar ${
                  user.photoURL ? "btn-ghost" : "btn-primary"
                }`}
              >
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="user" />
                  ) : (
                    <p className="text-3xl">{user?.displayName?.slice(0, 1)}</p>
                  )}
                </div>
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    className="btn btn-secondary mt-2 text-white"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
