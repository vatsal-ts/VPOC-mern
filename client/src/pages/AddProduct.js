import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../extra_styles/form_data.css";
class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      price: 0,
      category: "",
      productImage: "",
      categorys: [],
      productImageUrl: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("/category")
      .then((response) => {
        this.setState({ categorys: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handlePhoto = (e) => {
    this.setState({ productImage: e.target.files[0] });
    this.setState({ productImageURL: URL.createObjectURL(e.target.files[0]) });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('productImage', this.state.productImage)
    formData.append("title",this.state.title)
    formData.append("description",this.state.description)
    formData.append("price",this.state.price)
    formData.append("category",this.state.category)
    formData.append("sellerid",this.props.auth.user.id)
  
    fetch('/products/add', {
      method: 'POST',
      body: formData,
    }).then(res => {
      console.log(res.data)
    })

    window.location.href = "/dashboard";
  };
  
  render() {
    return (
      <section className="get-in-touch" style={{ padding: "30px" }}>
        <h1 className="title">
          Sell
          <span style={{ color: "grey", fontWeight: "100" }}> a product</span>
        </h1>
        <form
          className="contact-form row"
          onSubmit={this.onSubmit}
          enctype="multipart/form-data"
        >
          <div className="form-field col-lg-12 mx-auto" >
            <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg" class="img-fluid"></img>
          </div>
          <div className="form-field col-lg-12">
            <label htmlFor="productImage">Photos</label>
            <input
              type="file"
              required
              accept=".png, .jpg, .jpeg"
              name="productImage"
              id="productImage"
              className="form-control"
              onChange={this.handlePhoto}
            />
            {/* <img src={this.state.productImageUrl}></img>
             */}
          </div>
          <div className="form-field col-lg-12">
            <input
              type="text"
              required
              className="input-text js-input"
              id="title"
              value={this.state.title}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="title">
              Title
            </label>
          </div>
          <div className="form-field col-lg-6 ">
            <input
              className="input-text js-input"
              type="text"
              required
              id="price"
              value={`${this.state.price !== 0 ? this.state.price : ""}`}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="email">
              Price
            </label>
          </div>

          <div className="form-field col-lg-6 ">
            <select
              ref="catInput"
              required
              className="form-control"
              id="category"
              value={this.state.category}
              onChange={this.onChange}
            >
              <option value="" selected disabled hidden>
                Choose Category
              </option>
              {this.state.categorys.map((cat) => {
                return (
                  <option key={cat.category} value={cat.category}>
                    {cat.category}
                  </option>
                );
              })}
            </select>
          </div>

          {/* <div className="form-field col-lg-6 ">
            <input
              id="company"
              className="input-text js-input"
              type="text"
              required
            />
            <label className="label" htmlFor="company">
              Company Name
            </label>
          </div>
          <div className="form-field col-lg-6 ">
            <input
              id="phone"
              className="input-text js-input"
              type="text"
              required
            />
            <label className="label" htmlFor="phone">
              Contact Number
            </label>
          </div> */}
          <div className="form-field col-lg-12">
            <textarea
              //   style={{ height: "60px" }}
              id="description"
              value={this.state.description}
              onChange={this.onChange}
              className="area-text js-input"
              type="text"
              required
            />
            <label className="label" htmlFor="description">
              Description
            </label>
          </div>
          <div className="form-field col-lg-12">
            <input
              class="btn btn-primary btn-lg active"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </section>
    );
  }
}

AddProduct.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddProduct);
