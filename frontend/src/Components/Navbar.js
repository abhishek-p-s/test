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
        <div>
          <Link to="/task">Task</Link>
        </div>
        <div>
          <a onClick={logoutHandle} className="mx-4 text-white">
            {localStorage.getItem("userInfo") ? " Logout" : "Login"}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
