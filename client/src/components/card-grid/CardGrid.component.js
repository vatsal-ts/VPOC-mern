import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
let products = [
  {
    title: "First Card",
    description: "first text",
    footer: "Loreum ipsum dolor sit amet, consectetur adipiscing el",
  },
  {
    title: "Second Card",
    description: "second text",
    footer: "Loreum ipsum dolor sit amet, consectetur adipiscing el",
  },
  {
    title: "Third Card",
    description: "third text",
    footer: "Loreum ipsum dolor sit amet, consectetur adipiscing el",
  },
];
let productList = [];
products.forEach((product, index) => {
  productList.push(
    <div className="col">
      <div className="card h-100">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
          className="card-img-top"
          alt="Skyscrapers"
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">{product.footer}</small>
        </div>
        <div style={{textAlign:"center"}}>
        <button type="button" className="btn btn-link btn-block" style={{padding: "15px",textAlign:"center"}}>View Details</button>
        </div>
      </div>
    </div>
  );
});

class CardGrid extends Component {
  render() {
    return (
      <div
        className="row row-cols-1 row-cols-md-5 g-4"
        style={{ padding: "50px" }}
      >
        {productList}
      </div>
    );
  }
}
export default CardGrid;
