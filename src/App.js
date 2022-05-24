import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/shared/Navbar";
import Blog from "./pages/Blog/Blog";
import Footer from "./pages/shared/Footer";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
