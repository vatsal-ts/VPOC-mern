import React from "react";
import "./riggedcard.css";
const Rigged_card = () => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 container_foto ">
      <div className="ver_mas text-center">
        <span className="lnr lnr-eye" />
      </div>
      <article className="text-left">
        {/* <h2>
          TÍTULO DE <br />
          LA IMAGEN
        </h2>
        <h4>Descripción corta de la imagen en cuestión</h4> */}
      </article>
      <img
        src="https://img-aws.ehowcdn.com/400x400/ds-img.studiod.com/Half_Dome_from_Glacier_Point0_1.jpg"
        alt=""
      />
    </div>
  );
};

export default Rigged_card;
