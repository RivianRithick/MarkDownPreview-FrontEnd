import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ newMarkdownContent, setNewMarkdownContent }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/login");
  };
  const handlesubmit = () => {
    navigate("/create");
  };
  const chartsubmit = () => {
    navigate("/chart")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand">
          MarkDown Preview
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse nav-btns"
          id="navbarNavDropdown"
        >
          <div className="navbar-nav ms-auto">
            <button
              className="btn btn-primary mx-3 "
              style={{ width: "auto" }}
              onClick={handlesubmit}
            >
              Create MarkDown
            </button>
            <button
              className="btn btn-primary mx-3 "
              style={{ width: "auto" }}
              onClick={chartsubmit}
            >
              Chart
            </button>
          </div>
          <button
            className="btn text-center logout-button"
            style={{ backgroundColor: "rgb(237, 57, 57)" }}
            onClick={handleLogout}
          >
            <i className="fa-solid fa-power-off"> Log Out</i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
