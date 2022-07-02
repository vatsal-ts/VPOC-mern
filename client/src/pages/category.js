import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/Cards/CardGrid.component";
import Banner from "../components/Banner/banner";
import "../components/extrastyling/headerhover.css"

class CardGrid extends Component {
  constructor(props) {
    super(props);
    console.dir(props);

    this.state = { products: [] };
  }
  componentDidMount() {
    axios
      .get("/products/category/" + this.props.params.category)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  productList() {
    return this.state.products.map((currentProduct) => {
      return (!(currentProduct.buyerid))?<CardComponent product={currentProduct} />:"";
    });
  }

  render() {
    return (
      <div>
        
        
        
        <div className="" style={{textAlign: "center"}}><h1 class="mb-1 hover-underline-animation" style={{margin:"2rem",fontSize:"80px"}}>{this.props.params.category}</h1></div>
        <div style={{margin:"2rem"}}>
        <Banner />
        </div>
        <div
          className="row row-cols-1 row-cols-md-4 g-4"
          style={{ paddingLeft: "130px",paddingRight: "100px" ,paddingTop: "40px",paddingBottom: "40px"}}
        >
          {this.productList()}
        </div>
        
      </div>
    );
  }
}
export default (props) => <CardGrid {...props} params={useParams()} />;
