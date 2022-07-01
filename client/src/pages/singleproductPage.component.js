import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import AdditionalInfo from "./AdditionalInfo";
import axios from "axios";
import AlternateCardComponent from "../components/Cards/AlternateCardGrid.component";
import "../components/Cards/cardoo.css";
class SingleProduct extends Component {
  constructor(props) {
    super(props);
    console.dir(props);

    this.state = { product: {}, seller: {}, similarProducts: [] };
  }

  async componentDidMount() {
    const product = await axios.get("/products/" + this.props.params.id);
    // .then((response) => {
    //   this.setState({ product: response.data });
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    // {/* Default input */}
    //               {/* <input
    //               type="number"
    //               defaultValue={1}
    //               aria-label="Search"
    //               className="form-control"
    //               style={{ width: "100px" }}
    //             /> */}

    const seller = await axios.get("/user/" + product.data.sellerid);
    // .then((response2) => {
    //   this.setState({ seller: response2.data });
    // })
    // .catch((error2) => {
    //   console.log(error2);
    // });

    const similarProducts = await axios.get(
      "/products/category/" + product.data.category
    );
    // .then((response2) => {
    //   this.setState({ similarProducts : response2.data });
    // })
    // .catch((error2) => {
    //   console.log(error2);
    // });
    console.log(seller.data);
    console.log(similarProducts.data);
    this.setState({
      product: product.data,
      seller: seller.data,
      similarProducts: similarProducts.data,
    });
  }

  productList(productlist) {
    return productlist.map((currentProduct) => {
      return !currentProduct.buyerid ? (
        <AlternateCardComponent product={currentProduct} />
      ) : (
        ""
      );
    });
  }

  render() {
    return (
      <main className="pt-4 mx-10" style={{ marginTop: "-3%" }}>
        <div className="container dark-grey-text mt-5">
          {/* <div className="row wow fadeIn">
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
                    <span className="badge purple mr-1">
                      {this.state.product.category}
                    </span>
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
                <p className="lead font-weight-bold">
                  {this.state.product.title}
                </p>
                <p>{this.state.product.description}</p>
                <form className="d-flex justify-content-left">

                  <button
                    className="btn btn-primary btn-md my-0 p"
                    type="submit"
                  >
                    Buy Now
                    <i className="fas fa-shopping-cart ml-1" />
                  </button>
                  <button
                    className="btn btn-primary btn-md my-0 p"
                    type="submit"
                  >
                    Add To Cart
                    <i className="fas fa-shopping-cart ml-1" />
                  </button>
                </form>
              </div>
              <div>
                Seller info {this.state.seller.username}{" "}
                {this.state.seller.email}
              </div>
            </div>
          </div> */}
          <div className="cardoo">
            <Link to={`/products/category/${this.state.product.category}`}>
              <div className="cardoo__title">
                <div className="icon">
                  <i className="fa fa-arrow-left" />
                </div>
                <h3>{this.state.product.category}</h3>
              </div>
            </Link>
            <div className="cardoo__body">
              <div className="half">
                <div className="featured_text">
                  <h1>{this.state.product.title}</h1>
                  {/* <p className="sub">Office Chair</p> */}
                  <br/>
                  <p className="price">${this.state.product.price}</p>
                </div>
                <div className="image">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="half">
                <div className="description">
                  <p>
                    {this.state.product.description}
                  </p>
                </div>
                <span className="stock">
                  <i className="fa fa-shopping-cart" /> In stock
                </span>
                <br></br><br></br>
                <div className="reviews">
                  <i className="fa-solid fa-plane"></i>
                  {/* <ul className="stars">
                <li><i className="fa fa-star" /></li>
                <li><i className="fa fa-star" /></li>
                <li><i className="fa fa-star" /></li>
                <li><i className="fa fa-star" /></li>
                <li><i className="fa fa-star-o" /></li>
              </ul> */}
                  {/* <span>(64 reviews)</span> */}
                <strong>Shipped from </strong><br></br>
                {this.state.seller.address}
                </div>
              </div>
            </div>
            <div className="cardoo__footer">
              <div className="recommend">
                <p>Sold by</p>
                <h3>{this.state.seller.username}</h3>
                <h3>+91-{this.state.seller.phone}</h3>
              </div>
              <div className="action mx-1">
                <button type="button">Buy Now</button>
              </div>
              <div className="action mx-1">
                <button type="button">Add to cart</button>
              </div>
            </div>
          </div>

          <hr />
          {/* <div
        className="row row-cols-1 row-cols-md-5 g-4"
        style={{ padding: "30px" }}
      >
        {this.productList(this.state.similarProducts)}
      </div> */}

          <section>
            <div className="container py-6 row">
              <div className="" style={{ textAlign: "center" }}>
                <h1
                  class="hover-underline-animation"
                  style={{ marginBottom: "2rem" }}
                >
                  Similar Products
                </h1>
              </div>
              {this.productList(this.state.similarProducts)}
            </div>
          </section>

          {/* <AdditionalInfo/> */}
        </div>
      </main>
    );
  }
}
export default (props) => <SingleProduct {...props} params={useParams()} />;
