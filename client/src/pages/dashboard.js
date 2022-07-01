import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { logoutUser } from "../actions/authActions";
import Listers from "../components/list/list.component"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // console.dir(props);

    this.state = {
      selled: [],
      buyed: [],
      toBeSold: [],
    };

    this.myList = this.myList.bind(this)
  }

  componentDidMount() {
    axios
      .get("/products/buyer/" + this.props.auth.user.id)
      .then((response) => {
        console.log(response.data);
        this.setState({ buyed: response.data });
        
      })
      .catch((error) => {
        console.log(error);
      });

    
    axios
      .get("/products/seller/" + this.props.auth.user.id)
      .then((responses) => {
        console.log(responses.data);
        this.setState({ selled: [], toBeSold: [] });
        responses.data.forEach((response) => {
          if (response.buyerid) {
            this.setState(previousState => ({
              selled : [...previousState.selled, response]
          }));
          } else {
            this.setState(previousState => ({
              toBeSold : [...previousState.toBeSold, response]
          }));
          }
        }
        
        );
        console.log(this.state.toBeSold)
      })
      .catch((error) => {
        console.log(error);
      });

      console.log(this.state.buyed)
      console.log(this.state.selled)
      console.log(this.state.toBeSold)
  }

  myList(items){
    return items.map((item) => {
      return <Listers item={item}/>
        })
  }

  onLogoutClick = (e) => {
    e.preventDefault();

    this.props.logoutUser();
  };

  
  render() {
    const { user } = this.props.auth;
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-4">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">{user.username}</h5>
                  <p className="text-muted mb-1">{user.bio}</p>
                  {/* <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-globe fa-lg text-warning" />
                      <p className="mb-0">https://mdbootstrap.com</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                      <p className="mb-0">@mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-facebook-f fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.username}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.mobile}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          Available
                        </span>{" "}
                        Products
                      </p>
                      <ul className="list-group list-group-light">
                      {this.myList(this.state.toBeSold)}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      
                        <span className="text-primary font-italic me-1">
                          Sold
                        </span>{" "}
                        Products
                        <ul className="list-group list-group-light">
                        {this.myList(this.state.selled)}
                        </ul>
                        <span className="text-primary font-italic me-1">
                          Purchased
                        </span>{" "}
                        Products
                        <ul className="list-group list-group-light">
                        {this.myList(this.state.buyed)}
                        </ul>
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

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
