import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import axios from "axios";
import "./AdminLoginPopup.css";

const AdminLoginPopup = ({ setShowLogin }) => {
  const navigate = useNavigate(); // <-- initialize navigate

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/admin/login",
        data
      );

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        setShowLogin(false);

        // Redirect to Add page
        navigate("/orders"); // <-- redirect here
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <h2>Admin Login</h2>

        <input
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Admin Email"
          required
        />

        <input
          name="password"
          value={data.password}
          onChange={onChangeHandler}
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPopup;
