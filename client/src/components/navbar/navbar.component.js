import React, { Component } from "react";
import { Link } from "react-router-dom";
// import bootstrap from 'bootstrap';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./navbar.component.css"
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* insert profile pic for navigating to users profile page */}
          <a className="navbar-brand mb-0 h1" href="#">
            <AccountCircleIcon />
            Vpoc
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Cat-1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cat-2
                    </a>
                  </li>
                  {/* <li><hr className="dropdown-divider"></hr></li> */}
                  <li>
                    <a className="dropdown-item" href="#">
                      Cat-3
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <div class="searchbar">
                <input
                  class="search_input"
                  type="text"
                  name=""
                  placeholder="Search..."
                />
                <a href="#" class="search_icon">
                <i class="fa fa-search"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
