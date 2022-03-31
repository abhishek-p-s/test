import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const logoutHandle = (e) => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="brand">
        <Link to="/">
          <h3>
            <i className="fa fa-user mx-2" aria-hidden="true"></i>
            {localStorage.getItem("userInfo")
              ? JSON.parse(localStorage.getItem("userInfo")).name
              : ""}
          </h3>
        </Link>
      </div>
      <div className="logout">
        <button
          onClick={logoutHandle}
          className="btn btn-outline-info text-white"
        >
          {localStorage.getItem("userInfo") ? " Logout" : "Login"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
