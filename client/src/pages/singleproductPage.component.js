import React, { Component } from "react";
import { Link,useParams } from "react-router-dom";
import AdditionalInfo from "./AdditionalInfo";
import axios from "axios";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    console.dir(props);

    this.state = { product: {}};
  }

  componentDidMount() {
    axios
      .get("/products/" + this.props.params.id)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    return (
<main className="mt-5 pt-4">
      <div className="container dark-grey-text mt-5">
        {/*Grid row*/}
        <div className="row wow fadeIn">
          {/*Grid column*/}
          <div className="col-md-6 mb-4">
            <img
              src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg"
              className="img-fluid"
              alt=""
            />
          </div>
          {/*Grid column*/}
          {/*Grid column*/}
          <div className="col-md-6 mb-4">
            {/*Content*/}
            <div className="p-4">
              <div className="mb-3">
                <a href>
                  <span className="badge purple mr-1">{this.state.product.category}</span>
                </a>
                <a href>
                  <span className="badge blue mr-1">New</span>
                </a>
                <a href>
                  <span className="badge red mr-1">Bestseller</span>
                </a>
              </div>
              <p className="lead">
                <span>{this.state.product.price}</span>
              </p>
              <p className="lead font-weight-bold">{this.state.product.title}</p>
              <p>
                {this.state.product.description}
              </p>
              <form className="d-flex justify-content-left">
                {/* Default input */}
                {/* <input
                  type="number"
                  defaultValue={1}
                  aria-label="Search"
                  className="form-control"
                  style={{ width: "100px" }}
                /> */}
                <button className="btn btn-primary btn-md my-0 p" type="submit">
                  Buy Now
                  <i className="fas fa-shopping-cart ml-1" />
                </button>
              </form>
            </div>
            {/*Content*/}
          </div>
          {/*Grid column*/}
        </div>
        {/*Grid row*/}
        <hr />
        {/*Grid row*/}
        <AdditionalInfo/>
        {/*Grid row*/}
      </div>
    </main>
    );
  }
}
export default (props) => <SingleProduct {...props} params={useParams()} />;
