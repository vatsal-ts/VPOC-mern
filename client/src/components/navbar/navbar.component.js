import React, { Component } from "react";
import { Link } from "react-router-dom";
// import bootstrap from 'bootstrap';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SpecList from "./SpecList";
import axios from "axios";
import "./navbar.component.css";
class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: [],
      inputText: "",
      allProducts: [],
      searchList: [],
      // profileImage: "",
    };

    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get("/products/allproducts").then((response) => {
      this.setState({ allProducts: response.data });
    });
    axios
      .get("/user/" + this.props.auth.user.id)
      .then((response) => {
        // console.log("hi", response);
        this.setState({
          profileImage: response.data.profileImage,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("um", this.state.profileImage);
    axios
      .get("/category")
      .then((response) => {
        this.setState({ categorys: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  inputHandler = (e) => {
    //convert input text to lower case
    this.setState({
      searchList:
        e.target.value === ""
          ? []
          : this.state.allProducts.filter(
              (product) =>
                product.title.substring(0, e.target.value.length) ===
                e.target.value.toLowerCase()
            ),
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            {/* insert profile pic for navigating to users profile page */}
            {this.state.profileImage ? (
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none !important",
                  color: "none !important",
                }}
              >
                <i class="fa fa-user-circle-o">
                  <AccountCircleIcon />
                </i>
              </Link>
            ) : (
              ""
            )}
            <h5 style={{ margin: "0.5rem" }}>
              <a href="/">VPOC</a>
            </h5>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
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
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {this.state.categorys.map((cat) => (
                      <li>
                        <a
                          className="dropdown-item"
                          href={`/products/category/${cat.category}`}
                        >
                          {cat.category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <form className="d-flex">
                <div class="searchbar">
                  <input
                    class="search_input"
                    type="text"
                    name=""
                    onChange={this.inputHandler}
                    placeholder="Search..."
                  />
                  <a href="#" class="search_icon">
                    <i class="fa fa-search"></i>
                  </a>
                </div>
                {/* <SpecList input={this.state.inputText} /> */}
              </form>
            </div>
          </div>
        </nav>
        {this.state.searchList.length === 0 ? (
          ""
        ) : (
          <nav className="navbar navbar-expand-md bg-light navbar-dark">
            <div className="navbar-collapse collapse pt-2 pt-md-0" id="navbar2">
              <ul class="list-group-small list-group-flush list-group-light list-group-small">
                {this.state.searchList.map((product) => (
                  <li class="list-group-item bg-transparent">
                    <a className="" href={`/products/product/${product._id}`}>
                      {product.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

Navbar.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
