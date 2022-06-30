import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      price: 0,
      category: "",
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

  onSubmit = (e) => {
    e.preventDefault();

    const product = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      sellerid: this.props.auth.user.id,
    };

    console.log(product);

    axios.post("/products/add", product).then((res) => console.log(res.data));

    window.location.href = '/dashboard';
  };

  render() {
    return (
      <div>
        <h3>Add Product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">title: </label>
            <input
              type="text"
              required
              className="form-control"
              id="title"
              value={this.state.title}
              onChange={this.onChange}
            ></input>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              id="description"
              value={this.state.description}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>price: </label>
            <input
              type="text"
              required
              className="form-control"
              id="price"
              value={this.state.price}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Category: </label>
            <div>
              <select
                ref="catInput"
                required
                className="form-control"
                id="category"
                value={this.state.category}
                onChange={this.onChange}
              >
                <option value="" selected disabled hidden>Choose here</option>
                {this.state.categorys.map((cat) => {
                  return (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add Product"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
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
