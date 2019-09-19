import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSumbit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          <Input
            label="Username"
            name="username"
            onChange={this.handleChange}
            value={account.username}
            errors={errors.username}
          />
          <Input
            label="Password"
            name="password"
            onChange={this.handleChange}
            value={account.password}
            errors={errors.password}
          />
          <div>
            <button className="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
