import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../features/auth/authSlice";

const Register = () => {
  const { isLoading, user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords Not Match!");
    }

    dispatch(registerUser(formData));

    setFormData({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }

    if (isError || message) {
      toast.error(message);
    }
  }, [user, isError, isSuccess, message]);

  if (isLoading) {
    return (
      <div className="container p-5">
        <h1 className="display-5 text-center text-secondary">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container p-5">
      <h1 className="display-6 text-center">Register Here</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter Your Name"
          required
          name="name"
          onChange={handleChange}
          value={name}
        />
        <input
          type="email"
          className="form-control my-2"
          placeholder="Enter Your Email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Enter Your Password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Confirm Your Password"
          required
          name="password2"
          onChange={handleChange}
          value={password2}
        />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
