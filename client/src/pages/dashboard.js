import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { logoutUser } from "../actions/authActions";
import CardComponent from "../components/Cards/CardGrid.component";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.dir(props);

    this.state = { 
      selled: [],
      buyed:[],
      available:[]
    };
  }

  componentDidMount() {
    axios
    .get("/products/buyer/" + "62bda85f8a0d2ea1827cb667")
    .then((response) => {
      this.setState({ buyed: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
    
    axios
      .get("/products/seller/" + "62bda85f8a0d2ea1827cb667")
      .then((response) => {
        // response.data.forEach((response) => {
        //   if(response.buyerid){
        //     this.setState(prevState => ({arrayvar: [...prevState.arrayvar, response]}));
        //   }else{
        //     this.setState(prevState => ({arrayvar: [...prevState.arrayvar, response]}));
        //   }
        // })
        this.setState({ selled: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  productList(productlist) {
    return productlist.map((currentProduct) => {
      return (
        <CardComponent
            product = {currentProduct}
        />
      );
    });
  }

  onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align">
                <h4>
                <b>Hey there,</b> {user.username}
                <p className="flow-text grey-text text-darken-1">
                    You are logged into a full-stack{" "}
                    <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
                </h4>
                <button
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Logout
                </button>
            </div>
            </div>
            <div>selled</div>
            <div
              className="row row-cols-1 row-cols-md-5 g-4"
              style={{ padding: "30px" }}
            >
              {this.productList(this.state.selled)}
            </div>
            <div>buyed</div>
            <div
              className="row row-cols-1 row-cols-md-5 g-4"
              style={{ padding: "30px" }}
            >
              {this.productList(this.state.buyed)}
            </div>
            <div>available</div>
            <div
              className="row row-cols-1 row-cols-md-5 g-4"
              style={{ padding: "30px" }}
            >
              {this.productList(this.state.available)}
            </div>
        </div>
        );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);