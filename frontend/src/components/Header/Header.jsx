import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Hungry? We’ve got you covered! Discover delicious food from your
          favorite restaurants and get it delivered fast and fresh.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
