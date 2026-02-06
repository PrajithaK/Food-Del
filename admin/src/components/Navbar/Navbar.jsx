import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    setShowLogin(true);
    navigate("/"); // ✅ redirect
  };

  return (
    <div className="navbar">
      <img className='logo' src={assets.logo} alt="logo" />

      <div className="right-section">
        <img className='profile' src={assets.profile_image} alt="profile" />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
