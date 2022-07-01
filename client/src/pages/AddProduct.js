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
  };

  onSubmit = (e) => {
    e.preventDefault();

    const product = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      sellerid: this.props.auth.user.id,
      productImage: this.state.productImage,
    };

    console.log(product);

    axios.post("/products/add", product).then((res) => console.log(res.data));

    window.location.href = "/dashboard";
  };

  render() {
    return (
      <section className="get-in-touch">
        <h1 className="title">Add Product you would like to sell</h1>
        <form
          className="contact-form row"
          onSubmit={this.onSubmit}
          enctype="multipart/form-data"
        >
          <div className="form-group">
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
              value={`${this.state.price!==0?this.state.price:""}`}
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
                <option value="" selected disabled hidden>Choose Category</option>
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
              style={{ height: "60px" }}
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
