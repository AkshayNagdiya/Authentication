import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import PageNotFound from "./screens/PageNotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
