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
    return { username: "Username is required" };
  };

  handleSumbit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          <Input
            label="Username"
            name="username"
            onChange={this.handleChange}
            value={account.username}
          />
          <Input
            label="Password"
            name="password"
            onChange={this.handleChange}
            value={account.password}
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
