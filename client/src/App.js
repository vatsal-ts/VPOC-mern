import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
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
