import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSumbit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("Submitted");
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
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
            <button disabled={this.validate()} className="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
