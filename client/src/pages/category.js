import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/Cards/CardGrid.component";

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
      return (
        <CardComponent
            product = {currentProduct}
        />
      );
    });
  }

  render() {
    return (
      <div
        className="row row-cols-1 row-cols-md-5 g-4"
        style={{ padding: "30px" }}
      >
        {this.productList()}
      </div>
    );
  }
}
export default (props) => <CardGrid {...props} params={useParams()} />;
