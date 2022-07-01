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
      phone : "",
      name : "",
      bio : "",
    };

    this.onChange = this.onChange.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
  }

  componentDidMount() {
    axios
      .get("/user/"+this.props.auth.user.id)
      .then((response) => {
        this.setState({ 
          username : response.data.username,
          phone : response.data.phone,
          email : response.data.email,
          profileImage : response.data.profileImage,
          name : response.data.name,
          address : response.data.address,
          bio : response.data.bio,
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
    this.setState({profileImage: e.target.files[0]});
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      profileImage : this.state.profileImage,
      bio : this.state.bio
    };

    console.log(userData);

    axios.post(`/update/${this.props.auth.user.id}`, userData).then((res) => console.log(res.data));

    window.location.href = '/dashboard';
  };

  render() {
    return (
      <div>
        <h3>Edit Info</h3>
        <form onSubmit={this.onSubmit} enctype="multipart/form-data">
          <div className="form-group">
            <label htmlFor="profileImage">ProfileImage: </label>
              <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="profileImage"
                id = "profileImage"
                className="form-control"
                onChange={this.handlePhoto}
              />
          </div>
          <div className="form-group">
            <label htmlFor="name">name: </label>
            <input
              type="text"
              required
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={this.onChange}
            ></input>
          </div>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              id="username"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>address: </label>
            <input
              type="text"
              required
              className="form-control"
              id="address"
              value={this.state.address}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>phone: </label>
            <input
              type="text"
              required
              className="form-control"
              id="phone"
              value={this.state.phone}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>email: </label>
            <input
              type="text"
              required
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>bio: </label>
            <input
              type="text"
              required
              className="form-control"
              id="bio"
              value={this.state.bio}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Save"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
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
