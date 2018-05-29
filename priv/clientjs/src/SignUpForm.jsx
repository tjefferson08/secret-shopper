import axios from 'axios';
import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    console.log('state to be submitted', this.state);
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/users`, {
        user: {
          ...this.state
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>User Registration</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="alert alert-danger">
            <p>There are some errors</p>
          </div>
          <div className="form-group">
            <label>
              Name:
              <input
                type="text"
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <input
                type="text"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password
              <input
                type="password"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Confirm Password:
              <input
                type="password"
                name="passwordConfirm"
                onChange={this.handleInputChange}
                value={this.state.passwordConfirm}
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignUpForm;
