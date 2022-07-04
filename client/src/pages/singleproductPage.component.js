import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import AdditionalInfo from "./AdditionalInfo";
import axios from "axios";
import AlternateCardComponent from "../components/Cards/AlternateCardGrid.component";
import "../components/Cards/cardoo.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class SingleProduct extends Component {
  constructor(props) {
    super(props);
    console.dir(props);

    this.state = { product: {}, seller: {}, similarProducts: [] };
    this.onClick = this.onClick.bind(this);
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
      return ((!currentProduct.buyerid)&&(currentProduct._id!==this.state.product._id)) ? (
        <AlternateCardComponent product={currentProduct} enableWishlist={currentProduct.sellerid!==this.props.auth.user.id}/>
      ) : (
        ""
      );
    });
  }

  onClick() {
    const product = {
      product_id: this.state.product._id,
    };
    axios
      .post("/wishlist/" + this.props.auth.user.id, product)
      .then((res) => console.log(res));

    window.location.href = "/wishlist";
  }

  render() {
    const { user } = this.props.auth;
    const button1 = () => {
      if (!this.state.product.buyerid) {
        if (user.id !== this.state.seller._id) {
          return <button type="button">Buy Now</button>;
        } else {
          return (
            <Link to={`/products/update/${this.state.product._id}`}>
              <button type="button" class="btn btn-outline-warning">
                Edit
              </button>
            </Link>
          );
        }
      } else {
        return "";
      }
    };

    const button2 = () => {
      if (!this.state.product.buyerid) {
        if (user.id !== this.state.seller._id) {
          return (
            <button type="button" onClick={this.onClick}>
              Add to Wishlist
            </button>
          );
        } else {
          return (
            <button type="button" class="btn btn-outline-danger">
              Delete
            </button>
          );
        }
      } else {
        return "";
      }
    };
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
                  <br />
                  <p className="price">${this.state.product.price}</p>
                </div>
                <div className="image">
                  <img
                    src={`/file/${this.state.product.productImage}`}
                    style={{ height: "50%" }}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="half">
                <div className="description">
                  <p>{this.state.product.description}</p>
                </div>
                <span className="stock">
                  {this.state.product.buyerid ? (
                    <div>
                      <h3 style={{color:"red"}}><i class="fa fa-flag" aria-hidden="true" style={{color:"red"}}></i> Sold</h3>
                    </div>
                  ) : (
                    <div>
                      <h3 ><i class="fa fa-shopping-cart" aria-hidden="true"></i> In stock</h3>
                    </div>
                  )}
                </span>
                <br></br>
                <br></br>
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
                  <strong>Shipped from </strong>
                  <br></br>
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
              <div className="action mx-1">{button1()}</div>
              <div className="action mx-1">{button2()}</div>
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
SingleProduct.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)((props) => (
  <SingleProduct {...props} params={useParams()} />
));
