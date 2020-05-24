import React, { Component } from "react";
import { registerUser } from "../../actions/user_actions";
import { connect } from "react-redux";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
    } else {
      return true;
    }
    return false;
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ name, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    };

    if (this.isFormValid()) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat(
                "your attempt to send data to DB was faile"
              ),
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      console.log("Form is not valid");
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Sign up</h2>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                  id="name"
                  type="text"
                  className="validate"
                  placeholder="Name"
                />
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  id="email"
                  type="text"
                  className="validate"
                  placeholder="Email"
                />
                <span
                  className="helper-text"
                  data-error="type a right type email"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  id="password"
                  type="password"
                  className="validate"
                  placeholder="Password"
                />
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="passwordConfirmation"
                  value={this.state.passwordConfirmation}
                  onChange={(e) => this.handleChange(e)}
                  id="passwordConfirmation"
                  type="password"
                  className="validate"
                  placeholder="Password confirmation"
                />
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>

            {this.state.errors.length > 0 && (
              <div className="error-test">
                {this.displayErrors(this.state.errors)}
              </div>
            )}

            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={(e) => this.submitForm(e)}
                >
                  Create an account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
