import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import bootstrap from 'bootstrap';
import SearchIcon from '@mui/icons-material/Search';
export default class Navbar extends Component {

  render() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            {/* insert profile pic for navigating to users profile page */}
          <a class="navbar-brand" href="#"><SearchIcon/>Vpoc</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Cat-1</a></li>
                  <li><a class="dropdown-item" href="#">Cat-2</a></li>
                  {/* <li><hr class="dropdown-divider"></hr></li> */}
                  <li><a class="dropdown-item" href="#">Cat-3</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit"><SearchIcon/></button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}