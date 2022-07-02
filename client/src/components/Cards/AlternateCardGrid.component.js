import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CardComponent = ({ product }) => {
  return (
    
      <div className="col-md-6 col-xl-6 mb-3">
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  <img
                    src={`/file/${product.productImage}`}
                    className="w-100"
                  />
                  <a href="#!">
                    <div className="hover-overlay">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h5>{product.title}</h5>
                <div className="d-flex flex-row">
                  <div className="mb-1 me-2" style={{color:"#0a4275"}}>
                    {product.category}
                  </div>
                  {/* <span>310</span> */}
                </div>
                {/* <div className="mt-1 mb-0 text-muted small">
                        <span>100% cotton</span>
                        <span className="text-primary"> • </span>
                        <span>Light weight</span>
                        <span className="text-primary"> • </span>
                        <span>Best finish<br /></span>
                      </div>
                      <div className="mb-2 text-muted small">
                        <span>Unique design</span>
                        <span className="text-primary"> • </span>
                        <span>For men</span>
                        <span className="text-primary"> • </span>
                        <span>Casual<br /></span>
                      </div> */}
                <p
                  className="mb-0 mb-md-0"
                  style={{
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.description}
                </p>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">${product.price}</h4>
                  {/* <span className="text-danger">
                    <s>${(11 * product.price) / 10}</s>
                  </span> */}
                </div>
                <h6 className="text-success">Free shipping</h6>
                <div className="d-flex flex-column mt-4">
                  {/* <Link
                    to={`/products/product/${product._id}`}
                    className="btn-flat waves-effect"
              
                  > */}
                    <button className="btn btn-primary btn-sm" type="button" onClick={() => window.location.href=`/products/product/${product._id}`}>
                      Details
                    </button>
                  {/* </Link> */}
                  <button
                    className="btn btn-outline-primary btn-sm mt-2"
                    type="button"
                  >
                    Add to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default CardComponent;
