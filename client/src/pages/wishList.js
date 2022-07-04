import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import CardComponent from "../components/Cards/CardGrid.component";

class WishList extends Component {
  constructor(props) {
    super(props);
    console.dir(props);

    this.state = {
      products: [],
      username: "",
      email: "",
      address: 0,
      profileImage: "",
      phone: "",
      name: "",
      bio: "",
    };
  }
  componentDidMount() {
    axios
      .get("/user/" + this.props.auth.user.id)
      .then(async (response) => {
        const wishList = response.data.wishList;
        // this.setState({ products: [] });
        // let allProducts;
        await axios
          .get("/products/allproducts")
          .then((response) => this.setState({ products: response.data }));
        this.state.products.filter((product) => wishList.includes(product._id));
        //    allProducts.filter((product)=>wishList.includes(product.data));

        // Promise.all(
        //   wishList.map(async (id) => {
        //     await axios.get("/products/" + id).then((product) =>
        //       this.setState((previousState) => ({
        //         products: [...previousState.products, product.data],
        //       }))
        //     );
        //   })
        // );
        // const newres=responsees.map((response) => {response.data})
        this.setState({
          username: response.data.username,
          phone: response.data.phone,
          email: response.data.email,
          profileImage: response.data.profileImage,
          name: response.data.name,
          address: response.data.address,
          bio: response.data.bio,
          //   products:allProducts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onclick(id) {
    const product = {
      product_id: id,
    };
    axios
      .post("/wishlist/" + this.props.auth.user.id, product)
      .then((res) => console.log(res));
  }

  productList() {
    return this.state.products.map((currentProduct) => {
      return (
        <>
          <CardComponent product={currentProduct} />
          <li className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-danger ms-1"
              onClick={this.onclick(currentProduct._id)}
            >
              Delete
            </button>
          </li>
        </>
      );
    });
  }

  render() {
    return (
      <div>
        <div
          className="row row-cols-1 row-cols-md-4 g-4"
          style={{
            paddingLeft: "130px",
            paddingRight: "100px",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
        >
          {this.productList()}
        </div>
      </div>
    );
  }
}

WishList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(WishList);
