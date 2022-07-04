import "./App.css";
import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from "./components/footer/Footer.component";
import 'mdb-ui-kit/css/mdb.min.css';
import 'mdb-ui-kit/js/mdb.min.js'
import { Provider } from "react-redux";
import store from "./store";
import { connect } from "react-redux";
import CardGrid from "./pages/category";
import SingleProduct from "./pages/singleproductPage.component";
import Dashboard from "./pages/dashboard"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import EditUserInfo from "./pages/EditUserInfo"
// import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Scrollbars } from 'react-custom-scrollbars';
import Homie from "./pages/home"
import WishList from "./pages/wishList"
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated

  store.dispatch(setCurrentUser(decoded));

// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user

    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Homie/>}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={!localStorage.jwtToken?<Login />:<Dashboard />} />
          <Route path="/wishlist" element={!localStorage.jwtToken?<Login />:<WishList />} />
          {/* <PrivateRoute path="/dashboard"  element={<Dashboard/>} /> */}
          <Route path="/products/category/:category" element={<CardGrid/>} />
          <Route path="/products/add/" element={!localStorage.jwtToken?<Login />:<AddProduct/>} />
          <Route path="/products/product/:id" element={<SingleProduct />} />
          <Route path="/products/update/:id" element={!localStorage.jwtToken?<Login />:<EditProduct />} />
          <Route path="/user/edit/" element={!localStorage.jwtToken?<Login />:<EditUserInfo />} />
        </Routes>
        
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
