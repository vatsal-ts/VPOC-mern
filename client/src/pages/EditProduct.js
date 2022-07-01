import React, { Component } from 'react';
import axios from 'axios';
import { Link,useParams } from "react-router-dom";

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        description: "",
        price: 0,
        category: "",
        productImage : "",
        categorys: [],
      };

      this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/products/" + this.props.params.id)
      .then((response) => {
        this.setState({ 
            title : response.data.title,
            description : response.data.description,
            price : response.data.price,
            category : response.data.category,
            productImage : response.data.productImage
        });
      })
      .catch((error) => {
        console.log(error);
      });

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
    this.setState({productImage: e.target.files[0]});
  };

  onSubmit(e) {
    e.preventDefault();

    const product = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        category: this.state.category,
        productImage : this.state.productImage
    };

    console.log(product);

    axios.post('/products/update/' + this.props.params.id, product)
      .then(res => console.log(res.data));

    window.location.href = "/products/product/" + this.props.params.id;
  }

  render() {
    return (
        <div>
        <h3>Edit Product</h3>
        <form onSubmit={this.onSubmit} enctype="multipart/form-data">
          <div className="form-group">
            <label htmlFor="productImage">photo: </label>
              <input 
                type="file" 
                required
                accept=".png, .jpg, .jpeg"
                name="productImage"
                id = "productImage"
                className="form-control"
                onChange={this.handlePhoto}
              />
          </div>
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
              value="Edit Product"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default (props) => <EditProduct {...props} params={useParams()} />;