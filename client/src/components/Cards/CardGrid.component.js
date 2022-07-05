import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CardComponent = ({ product ,wishListEnable,onclick}) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={`/file/${product.productImage}`}
          className="card-img-top"
          alt="Skyscrapers"
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.price}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">{product.description}</small>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link
            to={`/products/product/${product._id}`}
            className="btn-flat waves-effect"
          >
            <button
              type="button"
              className="btn btn-link btn-block"
              style={{ padding: "15px", textAlign: "center" }}
            >
              View details
            </button>
          </Link>
        </div>
        {wishListEnable ? (
          <div style={{ textAlign: "center" }}>
              <button
                type="button"
                className="btn btn-link btn-block"
                style={{ padding: "15px", textAlign: "center",color:"red" }}
                onClick={onclick}
              >
                Remove from wishlist
              </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CardComponent;
