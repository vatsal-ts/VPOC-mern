import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EditUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      address: 0,
      profileImage: "",
      phone: "",
      name: "",
      bio: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
  }

  componentDidMount() {
    axios
      .get("/user/" + this.props.auth.user.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          phone: response.data.phone,
          email: response.data.email,
          profileImage: response.data.profileImage,
          name: response.data.name,
          address: response.data.address,
          bio: response.data.bio,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handlePhoto = (e) => {
    this.setState({
      profileImage: e.target.files[0],
      profileImageFilename: URL.createObjectURL(e.target.files[0]),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);
    formData.append("phone", this.state.phone);
    formData.append("address", this.state.address);
    formData.append("profileImage", this.state.profileImage);
    formData.append("bio", this.state.bio);

    fetch(`/update/${this.props.auth.user.id}`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      console.log(res.data);
    });

    console.log(formData);
    // window.location.href = "/dashboard";
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
          <div className="form-field col-lg-3">
            <img
              style={{ maxHeight: "200px" }}
              src={
                this.state.profileImageFilename
                  ? this.state.profileImageFilename
                  : `/file/${this.state.profileImage}`
              }
            ></img>
          </div>
          <div className="form-field col-lg-12">
            <label htmlFor="profileImage">ProfileImage: </label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="profileImage"
              id="profileImage"
              className="form-control"
              onChange={this.handlePhoto}
            />
            {/* <img src={this.state.productImageUrl}></img>
             */}
          </div>
          <div className="form-field col-lg-4">
            <input
              className="input-text js-input"
              type="text"
              required
              id="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="name">
              Name
            </label>
          </div>

          <div className="form-field col-lg-4">
            <input
              className="input-text js-input"
              type="text"
              required
              id="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="username">
              Username
            </label>
          </div>

          <div className="form-field col-lg-4">
            <input
              className="input-text js-input"
              type="text"
              required
              id="phone"
              value={this.state.phone}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="phone">
              Phone
            </label>
          </div>

          <div className="form-field col-lg-6 ">
            <input
              className="input-text js-input"
              type="text"
              required
              id="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="email">
              email
            </label>
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
              className="area-text js-input"
              type="text"
              required
              id="bio"
              value={this.state.bio}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="bio">
              Bio
            </label>
          </div>

          <div className="form-field col-lg-12">
            <textarea
              //   style={{ height: "60px" }}
              className="area-text js-input"
              type="text"
              required
              id="address"
              value={this.state.address}
              onChange={this.onChange}
            />
            <label className="label" htmlFor="address">
              Address
            </label>
          </div>

          <div className="form-field col-lg-12">
            <input
              type="submit"
              value="Save"
              class="btn btn-primary btn-lg active"
            />
          </div>
        </form>
      </section>
    );
  }
}

EditUserInfo.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(EditUserInfo);
