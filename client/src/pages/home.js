// import React from 'react'
import Banner from '../components/Banner/banner'
import React, { Component } from "react";
import RiggedCard from "../components/Cards/RiggedCard/rigged_card"
// import { Link } from "react-router-dom";
// // import bootstrap from 'bootstrap';
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import SpecList from "./SpecList";
import axios from "axios";

export default class Homie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: [],
      // inputText: "",
      // allProducts: [],
      // searchList: [],
      // profileImage: "",
    };

    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // console.log("um", this.state.profileImage);
    axios
      .get("/category")
      .then((response) => {
        this.setState({ categorys: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  productList() {
    return this.state.categorys.map((currentCategory) => {
      return <RiggedCard category={currentCategory} />;
    });
  }

  render() {
    return (
      <div>
        {/*Carousel Wrapper*/}
        <Banner/>
        {/*/.Carousel Wrapper*/}
        {this.productList()}
        {/*Main layout*/}
        <main>
          <div className="container">


            
          
        
        









            <section className="mt-5 wow fadeIn">
              {/*Grid row*/}
              <div className="row">
                {/*Grid column*/}
                <div className="col-md-6 mb-4">
                  <img src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg" className="img-fluid z-depth-1-half" alt="" />
                </div>
                {/*Grid column*/}
                {/*Grid column*/}
                <div className="col-md-6 mb-4">
                  {/* Main heading */}
                  <h3 className="h3 mb-3">Material Design for Bootstrap</h3>
                  <p>This template is created with Material Design for Bootstrap (
                    <strong>MDB</strong> ) framework.</p>
                  <p>Read details below to learn more about MDB.</p>
                  {/* Main heading */}
                  <hr />
                  <p>
                    <strong>400+</strong> material UI elements,
                    <strong>600+</strong> material icons,
                    <strong>74</strong> CSS animations, SASS files, templates, tutorials and many more.
                    <strong>Free for personal and commercial use.</strong>
                  </p>
                  {/* CTA */}
                  <a target="_blank" href="https://mdbootstrap.com/getting-started/" className="btn btn-indigo btn-md">Download
                    <i className="fas fa-download ml-1" />
                  </a>
                  <a target="_blank" href="https://mdbootstrap.com/components/" className="btn btn-indigo btn-md">Live demo
                    <i className="fas fa-image ml-1" />
                  </a>
                </div>
                {/*Grid column*/}
              </div>
              {/*Grid row*/}
            </section>
            










            <hr className="my-5" />
            










            <section>
              <h3 className="h3 text-center mb-5">About MDB</h3>
              {/*Grid row*/}
              <div className="row wow fadeIn">
                {/*Grid column*/}
                <div className="col-lg-6 col-md-12 px-4">
                  {/*First row*/}
                  <div className="row">
                    <div className="col-1 mr-3">
                      <i className="fas fa-code fa-2x indigo-text" />
                    </div>
                    <div className="col-10">
                      <h5 className="feature-title">Bootstrap 4</h5>
                      <p className="grey-text">Thanks to MDB you can take advantage of all feature of newest Bootstrap 4.</p>
                    </div>
                  </div>
                  {/*/First row*/}
                  <div style={{height: '30px'}} />
                  {/*Second row*/}
                  <div className="row">
                    <div className="col-1 mr-3">
                      <i className="fas fa-book fa-2x blue-text" />
                    </div>
                    <div className="col-10">
                      <h5 className="feature-title">Detailed documentation</h5>
                      <p className="grey-text">We give you detailed user-friendly documentation at your disposal. It will help you
                        to implement your ideas
                        easily.
                      </p>
                    </div>
                  </div>
                  {/*/Second row*/}
                  <div style={{height: '30px'}} />
                  {/*Third row*/}
                  <div className="row">
                    <div className="col-1 mr-3">
                      <i className="fas fa-graduation-cap fa-2x cyan-text" />
                    </div>
                    <div className="col-10">
                      <h5 className="feature-title">Lots of tutorials</h5>
                      <p className="grey-text">We care about the development of our users. We have prepared numerous tutorials,
                        which allow you to learn
                        how to use MDB as well as other technologies.</p>
                    </div>
                  </div>
                  {/*/Third row*/}
                </div>
                {/*/Grid column*/}
                {/*Grid column*/}
                <div className="col-lg-6 col-md-12">
                  <p className="h5 text-center mb-4">Watch our "5 min Quick Start" tutorial</p>
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/cXTThxoywNQ" allowFullScreen />
                  </div>
                </div>
                {/*/Grid column*/}
              </div>
              {/*/Grid row*/}
            </section>
            










            
            










            <hr className="mb-5" />
            





          
            





          </div>
        </main>
        {/*Main layout*/}

      </div>
    );
  }
}