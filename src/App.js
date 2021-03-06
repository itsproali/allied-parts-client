import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./pages/shared/Navbar";
import Blog from "./pages/Blog/Blog";
import Footer from "./pages/shared/Footer";
import Login from "./pages/Login/Login";
import Notfound from "./pages/Notfound/Notfound";
import Register from "./pages/Login/Register";
import Portfolio from "./pages/Portfolio/Portfolio";
import Loading from "./pages/shared/Loading";
import Parts from "./pages/Parts/Parts";
import ScrollToTop from "./pages/shared/ScrollToTop";
import Reviews from "./pages/Review/Reviews";
import Purchase from "./pages/Parts/Purchase";
import RequireAuth from "./pages/shared/RequireAuth";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/MyOrders";
import AddReview from "./pages/Dashboard/AddReview";
import RequireAdmin from "./pages/shared/RequireAdmin";
import ManageProducts from "./pages/Dashboard/ManageProducts";
import useAdmin from "./hooks/useAdmin";
import ManageOrders from "./pages/Dashboard/ManageOrders";
import Contact from "./pages/Contact/Contact";
import ManageUsers from "./pages/Dashboard/ManageUsers";
import MyProfile from "./pages/Dashboard/MyProfile";
import EditProfile from "./pages/Dashboard/EditProfile";
import AddItem from "./pages/Dashboard/AddItem";
import Payment from "./pages/Parts/Payment";

function App() {
  const [admin, adminLoading] = useAdmin();
  if (adminLoading) {
    return <Loading />;
  }
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parts" element={<Parts />} />
        <Route
          path="/purchase/:itemId"
          element={
            <RequireAuth>
              <Purchase />
            </RequireAuth>
          }
        />
        <Route
          path="/payment/:orderId"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          {admin ? (
            <Route
              index
              element={
                <RequireAdmin>
                  <ManageOrders />
                </RequireAdmin>
              }
            />
          ) : (
            <Route index element={<MyOrders />} />
          )}
          <Route path="add-review" element={<AddReview />} />
          <Route
            path="manage-products"
            element={
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            }
          />
          <Route
            path="manage-users"
            element={
              <RequireAdmin>
                <ManageUsers />
              </RequireAdmin>
            }
          />
        </Route>
        <Route
          path="/add-item"
          element={
            <RequireAdmin>
              <AddItem />
            </RequireAdmin>
          }
        />
        <Route
          path="/my-profile"
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/edit/:uid"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
