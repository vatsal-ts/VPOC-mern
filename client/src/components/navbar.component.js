import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import bootstrap from 'bootstrap';
import SearchIcon from '@mui/icons-material/Search';
export default class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            {/* insert profile pic for navigating to users profile page */}
          <a className="navbar-brand" href="#"><SearchIcon/>Vpoc</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Cat-1</a></li>
                  <li><a className="dropdown-item" href="#">Cat-2</a></li>
                  {/* <li><hr className="dropdown-divider"></hr></li> */}
                  <li><a className="dropdown-item" href="#">Cat-3</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit"><SearchIcon/></button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}