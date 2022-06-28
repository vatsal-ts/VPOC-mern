import logo from "./logo.svg";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component"
function App() {
  return (
    <Router>
      {/* <div className="container"> */}
        <Navbar />
        <br />
        {/* <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} /> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
