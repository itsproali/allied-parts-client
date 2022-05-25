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

function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/parts" element={<Parts />}></Route>
        <Route path="/purchase/:itemId" element={<Purchase />}></Route>
        <Route path="/reviews" element={<Reviews />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
