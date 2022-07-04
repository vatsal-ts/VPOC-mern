import React from "react";
import "./riggedcard.css";
import { Link } from "react-router-dom";
const Rigged_card = ({ category }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-0">
      <div class="container_foto">
        <img
          src={`/file/${category.categoryImage}`}
          className="img-fluid mb-0 image_foto"
          alt=""
        />
        <Link to={`/products/category/${category.category}`}>
          <div class="middle_foto">
            <div class="text_foto">{category.category}</div>
          </div>
        </Link>
      </div>

      {/* <img src="http://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(66).jpg" className="img-fluid mb-4" alt="" data-wow-delay="0.3s" /> */}
    </div>
    //Grid column
  );
};

export default Rigged_card;
