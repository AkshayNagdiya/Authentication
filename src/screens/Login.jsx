import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }

    if (isError || message) {
      toast.error(message);
    }
  }, [user, isError, message, isSuccess]);

  if (isLoading) {
    return (
      <div className="container p-5">
        <h1 className="display-5 text-center text-secondary">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container p-5">
      <h1 className="display-6 text-center">Login Here</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control my-2"
          placeholder="Enter Your Email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Enter Your Password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
