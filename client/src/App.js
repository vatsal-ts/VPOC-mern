import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from "./components/footer/Footer.component";
import 'mdb-ui-kit/css/mdb.min.css';
import { Provider } from "react-redux";
// import store from "./store";
import CardGrid from "./components/card-grid/CardGrid.component";
function App() {
  return (
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/products" element={<CardGrid />} />
        </Routes>
        <Footer />
      </Router>
  );
}

// function App() {
//   return (
//     <Router>
//         <Navbar />
//         <br />
//         {/* <Route path="/" exact component={ExercisesList} />
//         <Route path="/edit/:id" component={EditExercise} />
//         <Route path="/create" component={CreateExercise} />
//         <Route path="/user" component={CreateUser} /> */}
//         {/* <Route exact path="/register" component={Register} /> */}
//         <Route exact path="/login" component={Login} />
//     </Router>
//   );
// }

export default App;
