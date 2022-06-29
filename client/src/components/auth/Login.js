import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <section
        className="vh-80"
        style={{
          backgroundColor: "#eee",
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <div className="container h-75 my-10">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-lg-12 col-md-12">
              <div
                className="card text-black"
                style={{ borderRadius: "25px", height: "80%" }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>
                      <form className="mx-1 mx-md-4" noValidate onSubmit={this.onSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.email}
                              error={errors.email}
                            />
                            <label
                              className="form-label"
                              htmlFor="email"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              onChange={this.onChange}
                              value={this.state.password}
                              error={errors.password}
                            />
                            <label
                              className="form-label"
                              htmlFor="password"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      
                      <div class="mb-0 h6"  style={{textAlign: 'center'}}>Need an account?<br/>
                      <Link to="/register" className="btn-flat waves-effect">Signup</Link>
                      </div>
                      
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Login;
