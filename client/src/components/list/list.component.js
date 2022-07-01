import React from "react";
import { Link } from "react-router-dom";

const Listers = ({ item ,onclick}) => {
    return (
      <>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
            alt=""
            style={{ width: "45px", height: "45px" }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{item.title}</p>
            <p className="text-muted mb-0">{item.price}</p>
          </div>
        </div>
        <Link to={`/products/product/${item._id}`}>
          Details
        </Link>
      </li>
      <li className="list-group-item d-flex align-items-center">
      <Link to={`/products/update/${item._id}`}>
      <button
      type="button"
      className="btn btn-outline-warning ms-1"
      
    >
      Edit
    </button>
    </Link>
    <button
      type="button"
      className="btn btn-outline-danger ms-1"
      onClick={onclick}
    >
      Delete
    </button>
      </li>
    </>
    );
};

export default Listers;
