import React, { Component } from "react";
import { Link,useParams } from "react-router-dom";
import AdditionalInfo from "./AdditionalInfo";
import axios from "axios";
import CardComponent from "../components/Cards/CardGrid.component";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    console.dir(props);

    this.state = { product: {},seller : {},similarProducts : []};
  }

  async componentDidMount () {
    const product = await axios.get("/products/" + this.props.params.id)
      // .then((response) => {
      //   this.setState({ product: response.data });
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

    const seller  = await axios.get("/user/" + product.data.sellerid)
      // .then((response2) => {
      //   this.setState({ seller: response2.data });
      // })
      // .catch((error2) => {
      //   console.log(error2);
      // });

    const similarProducts = await axios.get("/products/category/" + product.data.category)
      // .then((response2) => {
      //   this.setState({ similarProducts : response2.data });
      // })
      // .catch((error2) => {
      //   console.log(error2);
      // });
      console.log(seller.data)
      console.log(similarProducts.data)
      this.setState({
        product : product.data,
        seller : seller.data,
        similarProducts : similarProducts.data
      })
    
  }

  productList(productlist) {
    return productlist.map((currentProduct) => {
      return <CardComponent product={currentProduct} />;
    });
  }
  
  render() {
    return (
<main className="mt-5 pt-4">
      <div className="container dark-grey-text mt-5">
        <div className="row wow fadeIn">
          <div className="col-md-6 mb-4">
            <img
              src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg"
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-6 mb-4">
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
                <button className="btn btn-primary btn-md my-0 p" type="submit">
                  Add To Cart
                  <i className="fas fa-shopping-cart ml-1" />
                </button>
              </form>
            </div>
            <div>Seller info {this.state.seller.username} {this.state.seller.email}</div>
          </div>

        </div>

        <hr />
        <div
        className="row row-cols-1 row-cols-md-5 g-4"
        style={{ padding: "30px" }}
      >
        {this.productList(this.state.similarProducts)}
      </div>
        
        {/* <AdditionalInfo/> */}

      </div>
    </main>
    );
  }
}
export default (props) => <SingleProduct {...props} params={useParams()} />;
