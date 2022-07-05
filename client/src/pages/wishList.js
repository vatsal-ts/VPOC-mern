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
      wishList : ""
    };

    this.onclick = this.onclick.bind(this)
  }
  async componentDidMount() {
    await axios
      .get("/user/" + this.props.auth.user.id)
      .then((response) => {
        // this.setState({ products: [] });
        // let allProducts;
        // await axios
        //   .get("/products/allproducts")
        //   .then((res) => this.setState({ products: res.data }));
        //   // this.state.products.filter((product)=>response.data.wishList.includes(product._id));
        // console.log(this.state.products)
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
          wishList : response.data.wishList
        });
      })
      .catch((error) => {
        console.log(error);
      });

      await axios
        .get("/products/allproducts")
        .then((res) => this.setState({ 
          products: res.data.filter((product)=>this.state.wishList.includes(product._id))
        }));
  }

  onclick(id) {
    const product = {
      product_id: id,
    };

    axios
      .post("/wishlist/delete/" + this.props.auth.user.id, product)
      .then((res) => console.log(res));

    this.setState({
      products : this.state.products.filter(product => (product._id != id)),
      wishList : this.state.wishList.filter(product_id => (product_id != id))
    })
  }

  productList() {
    return this.state.products.map((currentProduct) => {
      return (
        <>
          <CardComponent product={currentProduct} wishListEnable={true} onclick={() => this.onclick(currentProduct._id)}/>
          
        </>
      );
    });
  }

  render() {
    return (
        
      <div>
        <div className="" style={{textAlign: "center"}}><h1 class="mb-1 hover-underline-animation" style={{margin:"2rem",fontSize:"80px"}}>Wish List <i class="fa fa-heart" style={{color:"red"}}></i></h1></div>
        
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
